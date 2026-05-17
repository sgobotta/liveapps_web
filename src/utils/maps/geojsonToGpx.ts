import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
  Position,
} from 'geojson';

export interface GeojsonToGpxOptions {
  creator?: string;
  featureTitle?: (properties: GeoJsonProperties) => string;
  featureDescription?: (properties: GeoJsonProperties) => string;
  featureCoordTimes?: (feature: Feature) => string[] | null;
}

function defaultFeatureTitle(properties: GeoJsonProperties): string {
  if (properties == null) {
    return '';
  }
  const props = properties as Record<string, unknown>;
  if (typeof props.tags === 'object' && props.tags != null) {
    const tagsTitle = defaultFeatureTitle(props.tags as GeoJsonProperties);
    if (tagsTitle !== '') {
      return tagsTitle;
    }
  }
  if (typeof props.name === 'string' && props.name !== '') {
    return props.name;
  }
  if (typeof props.ref === 'string' && props.ref !== '') {
    return props.ref;
  }
  if (typeof props.id === 'string' && props.id !== '') {
    return props.id;
  }
  return '';
}

function defaultFeatureDescription(properties: GeoJsonProperties): string {
  if (properties == null) {
    return '';
  }
  const props = properties as Record<string, unknown>;
  if (typeof props.tags === 'object' && props.tags != null) {
    return defaultFeatureDescription(props.tags as GeoJsonProperties);
  }
  let res = '';
  for (const key in props) {
    if (!Object.prototype.hasOwnProperty.call(props, key)) {
      continue;
    }
    const value = props[key];
    if (typeof value === 'object') {
      continue;
    }
    res += key + '=' + String(value) + '\n';
  }
  if (res.length === 0) {
    return '';
  }
  return res.substr(0, res.length - 1);
}

function defaultFeatureCoordTimes(feature: Feature): string[] | null {
  if (feature.properties == null) {
    return null;
  }
  const props = feature.properties as Record<string, unknown>;
  const times = props.times;
  if (Array.isArray(times)) {
    return times as string[];
  }
  const coordTimes = props.coordTimes;
  if (Array.isArray(coordTimes)) {
    return coordTimes as string[];
  }
  return null;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function xmlElement(
  tag: string,
  content: string,
  attrs?: Record<string, string>,
): string {
  let open = '<' + tag;
  if (attrs != null) {
    for (const key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key)) {
        open += ' ' + key + '="' + escapeXml(attrs[key]) + '"';
      }
    }
  }
  if (content === '') {
    return open + '/>';
  }
  return open + '>' + escapeXml(content) + '</' + tag + '>';
}

function trackPointXml(coordinates: Position, time?: string): string {
  const attrs: Record<string, string> = {
    lat: String(coordinates[1]),
    lon: String(coordinates[0]),
  };
  let inner = '';
  if (coordinates[2] !== undefined) {
    inner += xmlElement('ele', String(coordinates[2]));
  }
  if (time != null && time !== '') {
    inner += xmlElement('time', time);
  }
  let open =
    '<trkpt lat="' +
    escapeXml(attrs.lat) +
    '" lon="' +
    escapeXml(attrs.lon) +
    '"';
  if (inner === '') {
    return open + '/>';
  }
  return open + '>' + inner + '</trkpt>';
}

function waypointXml(
  coordinates: Position,
  name: string,
  desc: string,
): string {
  const attrs = {
    lat: String(coordinates[1]),
    lon: String(coordinates[0]),
  };
  let inner = xmlElement('name', name) + xmlElement('desc', desc);
  if (coordinates[2] !== undefined) {
    inner += xmlElement('ele', String(coordinates[2]));
  }
  return (
    '<wpt lat="' +
    escapeXml(attrs.lat) +
    '" lon="' +
    escapeXml(attrs.lon) +
    '">' +
    inner +
    '</wpt>'
  );
}

function normalizeFeatures(
  geojson: FeatureCollection | Feature | Geometry,
): Feature[] {
  if (geojson.type === 'FeatureCollection') {
    return geojson.features;
  }
  if (geojson.type === 'Feature') {
    return [geojson];
  }
  return [
    {
      type: 'Feature',
      properties: {},
      geometry: geojson,
    },
  ];
}

/**
 * Converts GeoJSON to a GPX 1.1 XML string (strict-mode safe replacement for `togpx`).
 */
export function geojsonToGpx(
  geojson: FeatureCollection | Feature | Geometry,
  options: GeojsonToGpxOptions = {},
): string {
  const creator = options.creator == null ? 'liveapps' : options.creator;
  const featureTitle =
    options.featureTitle == null ? defaultFeatureTitle : options.featureTitle;
  const featureDescription =
    options.featureDescription == null
      ? defaultFeatureDescription
      : options.featureDescription;
  const featureCoordTimes =
    options.featureCoordTimes == null
      ? defaultFeatureCoordTimes
      : options.featureCoordTimes;

  const waypoints: string[] = [];
  const tracks: string[] = [];

  function mapFeature(feature: Feature): void {
    const geometry = feature.geometry;
    if (geometry == null) {
      return;
    }

    const name = featureTitle(feature.properties);
    const desc = featureDescription(feature.properties);

    switch (geometry.type) {
      case 'Point':
      case 'MultiPoint': {
        const coords =
          geometry.type === 'Point'
            ? [geometry.coordinates]
            : geometry.coordinates;
        for (let i = 0; i < coords.length; i++) {
          waypoints.push(waypointXml(coords[i], name, desc));
        }
        break;
      }
      case 'LineString':
      case 'MultiLineString': {
        const lineCoords =
          geometry.type === 'LineString'
            ? [geometry.coordinates]
            : geometry.coordinates;
        const times = featureCoordTimes(feature);
        let trackInner = xmlElement('name', name) + xmlElement('desc', desc);
        for (let s = 0; s < lineCoords.length; s++) {
          const coordinates = lineCoords[s];
          let segInner = '';
          for (let i = 0; i < coordinates.length; i++) {
            const time =
              times != null && times[i] != null ? times[i] : undefined;
            segInner += trackPointXml(coordinates[i], time);
          }
          trackInner += '<trkseg>' + segInner + '</trkseg>';
        }
        tracks.push('<trk>' + trackInner + '</trk>');
        break;
      }
      case 'Polygon':
      case 'MultiPolygon': {
        const polyCoords =
          geometry.type === 'Polygon'
            ? [geometry.coordinates]
            : geometry.coordinates;
        const times = featureCoordTimes(feature);
        let trackInner = xmlElement('name', name) + xmlElement('desc', desc);
        for (let p = 0; p < polyCoords.length; p++) {
          const poly = polyCoords[p];
          for (let r = 0; r < poly.length; r++) {
            const ring = poly[r];
            let segInner = '';
            for (let i = 0; i < ring.length; i++) {
              const time =
                times != null && times[i] != null ? times[i] : undefined;
              segInner += trackPointXml(ring[i], time);
            }
            trackInner += '<trkseg>' + segInner + '</trkseg>';
          }
        }
        tracks.push('<trk>' + trackInner + '</trk>');
        break;
      }
      case 'GeometryCollection':
        for (let g = 0; g < geometry.geometries.length; g++) {
          mapFeature({
            type: 'Feature',
            properties: feature.properties,
            geometry: geometry.geometries[g],
          });
        }
        break;
      default:
        break;
    }
  }

  const features = normalizeFeatures(geojson);
  for (let f = 0; f < features.length; f++) {
    mapFeature(features[f]);
  }

  const body = waypoints.join('') + tracks.join('');
  return (
    '<gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    'xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" ' +
    'version="1.1" creator="' +
    escapeXml(creator) +
    '"><metadata/>' +
    body +
    '</gpx>'
  );
}

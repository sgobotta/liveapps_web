import JSZip from 'jszip';
import { kml as toGeoJSON } from '@tmcw/togeojson';
// @ts-ignore
import togpx from 'togpx';
import type { FeatureCollection, Feature, Geometry } from 'geojson';

export interface ConversionStats {
  points: number;
  tracks: number;
  routes: number;
  total: number;
}

export interface ConversionResult {
  gpx: string;
  stats: ConversionStats;
}

/**
 * Converts a KMZ or KML File/Blob to a GPX string.
 *
 * @param file     - The KMZ or KML file to convert.
 * @param filename - Optional filename hint used to detect .kmz vs .kml.
 *                   Defaults to `file.name` when available (i.e. File objects).
 */
export async function kmzToGpx(
  file: File | Blob,
  filename: string = (file as File).name ?? '',
): Promise<ConversionResult> {
  const kmlText = await extractKml(file, filename);
  const kmlDom = parseKml(kmlText);
  const geojson = toGeoJSON(kmlDom) as FeatureCollection;

  if (!geojson?.features?.length) {
    throw new Error('No features found in the KML file.');
  }

  const gpx = togpx(geojson) as string;
  const stats = computeStats(geojson.features);

  return { gpx, stats };
}

/**
 * Extracts KML text from a KMZ (zip) or plain KML file.
 */
async function extractKml(
  file: File | Blob,
  filename: string,
): Promise<string> {
  if (filename.toLowerCase().endsWith('.kmz')) {
    const zip = await JSZip.loadAsync(file);

    const kmlEntry = Object.values(zip.files).find((f) =>
      f.name.toLowerCase().endsWith('.kml'),
    );

    if (!kmlEntry) {
      throw new Error('No .kml file found inside the .kmz archive.');
    }

    return kmlEntry.async('string');
  }

  return file.text();
}

/**
 * Parses a KML string into a DOM Document.
 * Throws if the XML is malformed.
 */
function parseKml(kmlText: string): Document {
  const parser = new DOMParser();
  const doc = parser.parseFromString(kmlText, 'text/xml');

  const errors = doc.getElementsByTagName('parsererror');
  const firstErr = errors.length > 0 ? errors.item(0) : null;
  if (firstErr != null) {
    const msg =
      typeof firstErr.textContent === 'string'
        ? firstErr.textContent.trim()
        : '';
    throw new Error('Failed to parse KML: ' + msg);
  }

  return doc;
}

const POINT_TYPES = new Set<Geometry['type']>(['Point', 'MultiPoint']);
const TRACK_TYPES = new Set<Geometry['type']>([
  'LineString',
  'MultiLineString',
]);
const ROUTE_TYPES = new Set<Geometry['type']>(['Polygon', 'MultiPolygon']);

/**
 * Counts waypoints, tracks, and routes from a GeoJSON feature list.
 */
function computeStats(features: Feature[]): ConversionStats {
  let points = 0;
  let tracks = 0;
  let routes = 0;

  for (const feature of features) {
    const type = feature.geometry?.type;
    if (!type) continue;
    if (POINT_TYPES.has(type)) points++;
    else if (TRACK_TYPES.has(type)) tracks++;
    else if (ROUTE_TYPES.has(type)) routes++;
  }

  return { points, tracks, routes, total: features.length };
}

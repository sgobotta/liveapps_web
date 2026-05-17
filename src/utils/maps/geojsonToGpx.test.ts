import { describe, expect, it } from 'vitest';
import type { FeatureCollection } from 'geojson';
import { geojsonToGpx } from './geojsonToGpx';

describe('geojsonToGpx', () => {
  it('converts points and line strings without throwing', () => {
    const geojson: FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'Start' },
          geometry: { type: 'Point', coordinates: [-58.44, -34.58, 10] },
        },
        {
          type: 'Feature',
          properties: { name: 'Route' },
          geometry: {
            type: 'LineString',
            coordinates: [
              [-58.44, -34.58],
              [-58.45, -34.59],
            ],
          },
        },
      ],
    };

    const gpx = geojsonToGpx(geojson);
    expect(gpx).toContain('<gpx ');
    expect(gpx).toContain('<wpt lat="-34.58" lon="-58.44">');
    expect(gpx).toContain('<name>Start</name>');
    expect(gpx).toContain('<trk>');
    expect(gpx).toContain('<trkpt lat="-34.59" lon="-58.45"/>');
  });
});

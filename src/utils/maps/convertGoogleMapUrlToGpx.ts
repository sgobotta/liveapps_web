import { kmzToGpx } from '../../scripts/maps/kmz_to_gpx';
import { fetchMapBlob } from './fetchMapBlob';
import {
  filenameHintFromFetchUrl,
  gpxFilenameFromDateTime,
} from './gpxFilename';
import { resolveMapFetchUrl } from './resolveMapFetchUrl';

function downloadGpxFile(filename: string, gpx: string): void {
  const blob = new Blob([gpx], { type: 'application/gpx+xml' });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}

/**
 * Resolves a My Maps link, fetches KML/KMZ in memory, converts to GPX, and triggers a browser download.
 */
export async function convertGoogleMapUrlToGpx(inputUrl: string): Promise<{
  filename: string;
  bytesFetched: number;
  bytesWritten: number;
}> {
  const fetchUrl = resolveMapFetchUrl(inputUrl);
  const mapBlob = await fetchMapBlob(fetchUrl);
  const result = await kmzToGpx(mapBlob, filenameHintFromFetchUrl(fetchUrl));
  const filename = gpxFilenameFromDateTime();
  downloadGpxFile(filename, result.gpx);
  return {
    filename,
    bytesFetched: mapBlob.size,
    bytesWritten: result.gpx.length,
  };
}

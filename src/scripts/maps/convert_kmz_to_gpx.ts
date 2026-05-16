import fs from "fs";
import path from "path";
import { DOMParser } from "@xmldom/xmldom";
import { filenameHintFromFetchUrl, gpxFilenameFromDateTime } from "../../utils/maps/gpxFilename";
import { resolveMapFetchUrl } from "../../utils/maps/resolveMapFetchUrl";
import { DEFAULT_MAP_URL, fetchMapFromUrl } from "./download_kmz";
import { kmzToGpx } from "./kmz_to_gpx";

const domGlobal = globalThis as typeof globalThis & {
  DOMParser: typeof DOMParser;
};
domGlobal.DOMParser = DOMParser as unknown as (typeof domGlobal)["DOMParser"];

const GPX_EXTENSION = ".gpx";

export { gpxFilenameFromDateTime };

function defaultGpxOutputPath(cwd: string = process.cwd()): string {
  return path.join(cwd, gpxFilenameFromDateTime());
}

/** Ensures the path ends with `.gpx` (appends if missing). */
function withGpxExtension(filePath: string): string {
  return path.extname(filePath).toLowerCase() === GPX_EXTENSION
    ? filePath
    : filePath + GPX_EXTENSION;
}

/**
 * Fetches a map from a full URL, converts it via {@link kmzToGpx}, and writes GPX to disk.
 *
 * @param options.url        - Full URL to fetch (defaults to {@link DEFAULT_MAP_URL})
 * @param options.outputPath - GPX output path (`.gpx` appended when omitted; default is datetime-based in cwd)
 */
export async function convertUrlToGpx(options?: {
  url?: string;
  outputPath?: string;
}): Promise<{
  outputPath: string;
  bytesFetched: number;
  bytesWritten: number;
}> {
  const inputUrl = options != null && options.url != null ? options.url : DEFAULT_MAP_URL;

  const fetchUrl = resolveMapFetchUrl(inputUrl);
  const mapBuffer = await fetchMapFromUrl(inputUrl);
  const blob = new Blob([new Uint8Array(mapBuffer)]);
  const result = await kmzToGpx(blob, filenameHintFromFetchUrl(fetchUrl));

  const out =
    options != null && options.outputPath != null
      ? withGpxExtension(options.outputPath)
      : defaultGpxOutputPath();

  fs.writeFileSync(out, result.gpx, "utf8");
  return {
    outputPath: out,
    bytesFetched: mapBuffer.length,
    bytesWritten: Buffer.byteLength(result.gpx, "utf8"),
  };
}

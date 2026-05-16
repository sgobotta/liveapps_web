import fs from "fs";
import path from "path";
import { DOMParser } from "@xmldom/xmldom";
import { filenameHintFromFetchUrl, gpxFilenameFromDateTime } from "../../utils/maps/gpxFilename";
import { ensureMapOutputDir, MAP_OUTPUT_DIR } from "../../utils/maps/outputDir";
import { resolveMapFetchUrl } from "../../utils/maps/resolveMapFetchUrl";
import { DEFAULT_MAP_URL, fetchMapFromUrl } from "./download_kmz";
import { kmzToGpx } from "./kmz_to_gpx";

const domGlobal = globalThis as typeof globalThis & {
  DOMParser: typeof DOMParser;
};
domGlobal.DOMParser = DOMParser as unknown as (typeof domGlobal)["DOMParser"];

const GPX_EXTENSION = ".gpx";

export { gpxFilenameFromDateTime };

/** Ensures the path ends with `.gpx` (appends if missing). */
function withGpxExtension(filePath: string): string {
  return path.extname(filePath).toLowerCase() === GPX_EXTENSION
    ? filePath
    : filePath + GPX_EXTENSION;
}

/**
 * Resolves a GPX path under {@link MAP_OUTPUT_DIR}.
 * @param outputPath - Optional basename or relative path within `output/maps/`
 */
function resolveGpxOutputPath(outputPath?: string): string {
  ensureMapOutputDir();
  if (outputPath != null && outputPath !== "") {
    const relative =
      path.isAbsolute(outputPath) === true ? path.basename(outputPath) : outputPath;
    return withGpxExtension(path.join(MAP_OUTPUT_DIR, relative));
  }
  return withGpxExtension(path.join(MAP_OUTPUT_DIR, gpxFilenameFromDateTime()));
}

/**
 * Fetches a map from a full URL, converts it via {@link kmzToGpx}, and writes GPX to disk.
 *
 * @param options.url        - Full URL to fetch (defaults to {@link DEFAULT_MAP_URL})
 * @param options.outputPath - GPX basename or path under `output/maps/` (default: datetime-based file in that folder)
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

  const out = resolveGpxOutputPath(
    options != null ? options.outputPath : undefined,
  );

  fs.writeFileSync(out, result.gpx, "utf8");
  return {
    outputPath: out,
    bytesFetched: mapBuffer.length,
    bytesWritten: Buffer.byteLength(result.gpx, "utf8"),
  };
}

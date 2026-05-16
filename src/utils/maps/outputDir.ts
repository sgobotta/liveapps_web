import fs from "fs";
import path from "path";

/** GPX files from the CLI (`yarn maps:gpx-from-mymaps`) are written here. */
export const MAP_OUTPUT_DIR = path.join(process.cwd(), "output", "maps");

export function ensureMapOutputDir(): void {
  fs.mkdirSync(MAP_OUTPUT_DIR, { recursive: true });
}

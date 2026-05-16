const GPX_EXTENSION = ".gpx";

/** e.g. `2026-05-16T14-30-45.gpx` (local time, filesystem-safe) */
export function gpxFilenameFromDateTime(date: Date = new Date()): string {
  const pad = (n: number) => (n < 10 ? "0" : "") + String(n);
  const stamp =
    String(date.getFullYear()) +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    "-" +
    pad(date.getMinutes()) +
    "-" +
    pad(date.getSeconds());
  return stamp + GPX_EXTENSION;
}

export function filenameHintFromFetchUrl(fetchUrl: string): string {
  try {
    const base = fetchUrl.split("?")[0].split("/").pop();
    if (base != null && base !== "") {
      const lower = base.toLowerCase();
      if (lower.endsWith(".kml") || lower.endsWith(".kmz")) {
        return base;
      }
    }
  } catch (_) {
    /* fall through */
  }
  return "map.kml";
}

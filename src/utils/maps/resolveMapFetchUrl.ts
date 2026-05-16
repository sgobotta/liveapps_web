/**
 * Normalizes a Google My Maps viewer/share link (or KML/KMZ URL) into a fetchable KML URL.
 */
export function resolveMapFetchUrl(input: string): string {
  const trimmed = input.trim();
  if (trimmed === "") {
    throw new Error("URL is required.");
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch (_) {
    throw new Error("Invalid URL.");
  }

  const mid = parsed.searchParams.get("mid");
  if (mid != null && mid !== "") {
    return (
      "https://www.google.com/maps/d/kml?mid=" +
      encodeURIComponent(mid) +
      "&forcekml=1"
    );
  }

  const lower = trimmed.toLowerCase();
  if (lower.indexOf(".kmz") !== -1 || parsed.pathname.indexOf("/kml") !== -1) {
    return trimmed;
  }

  throw new Error("Could not find a map id (mid) in the URL.");
}

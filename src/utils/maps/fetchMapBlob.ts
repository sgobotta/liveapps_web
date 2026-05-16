/**
 * In development, routes through the Vite dev proxy (`vite.config.ts`) to avoid CORS.
 */
function toFetchUrl(absoluteUrl: string): string {
  if (import.meta.env.DEV) {
    const parsed = new URL(absoluteUrl);
    return '/maps-proxy' + parsed.pathname + parsed.search;
  }
  return absoluteUrl;
}

export async function fetchMapBlob(absoluteUrl: string): Promise<Blob> {
  const response = await fetch(toFetchUrl(absoluteUrl));
  if (!response.ok) {
    throw new Error(
      'HTTP ' + String(response.status) + ' while fetching map data.',
    );
  }
  return response.blob();
}

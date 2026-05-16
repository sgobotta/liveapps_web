/** Resolve a path against Vite's `base` (replaces CRA `PUBLIC_URL`). */
export function withBaseUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  if (path.charAt(0) === '/') {
    return base.replace(/\/$/, '') + path;
  }
  return base + path;
}

import http from "http";
import https from "https";
import path from "path";
import { URL } from "url";
import { resolveMapFetchUrl } from "../../utils/maps/resolveMapFetchUrl";

/** Default map URL (same as the original script). */
export const DEFAULT_MAP_URL =
  "https://www.google.com/maps/d/kml?mid=1Iopm3mW3zSjKUNQXVc5_ZeU_D2CzBqw&forcekml=1";

const MAX_REDIRECTS = 5;
const DEFAULT_FILENAME_HINT = "map.kml";

/**
 * Fetches map KML/KMZ bytes from a full URL (in memory; no file write).
 */
export function fetchMapFromUrl(url: string): Promise<Buffer> {
  return fetchBuffer(resolveMapFetchUrl(url), 0);
}

function fetchBuffer(targetUrl: string, redirectCount: number): Promise<Buffer> {
  if (redirectCount > MAX_REDIRECTS) {
    return Promise.reject(new Error("Too many redirects while fetching map file."));
  }

  const client = getHttpClient(targetUrl);

  return new Promise(function fetchPromise(resolve, reject) {
    client
      .get(targetUrl, function onResponse(res) {
        const code = res.statusCode;
        if (code != null && (code === 301 || code === 302 || code === 307 || code === 308)) {
          const loc = res.headers.location;
          if (loc != null && loc !== "") {
            res.resume();
            let nextAbs = "";
            try {
              nextAbs = new URL(loc, targetUrl).toString();
            } catch (_) {
              reject(new Error("Redirect contained an invalid Location header."));
              return;
            }
            resolve(fetchBuffer(nextAbs, redirectCount + 1));
            return;
          }
        }

        if (code == null || code >= 400) {
          reject(new Error("HTTP " + String(code) + " from " + targetUrl + "."));
          res.resume();
          return;
        }

        const chunks: Buffer[] = [];
        res.on("data", function onData(chunk: Buffer): void {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });
        res.on("end", function onEnd(): void {
          resolve(Buffer.concat(chunks as unknown as readonly Uint8Array[]));
        });
      })
      .on("error", function onErr(err): void {
        reject(err);
      });
  });
}

function getHttpClient(targetUrl: string): typeof https {
  const parsed = new URL(targetUrl);
  return parsed.protocol === "http:" ? (http as unknown as typeof https) : https;
}

/** Filename hint for {@link kmzToGpx} (.kmz vs .kml detection). */
export function filenameHintFromUrl(targetUrl: string): string {
  try {
    const base = path.basename(new URL(targetUrl).pathname);
    if (base != null && base !== "" && base !== "/") {
      const lower = base.toLowerCase();
      if (lower.endsWith(".kml") || lower.endsWith(".kmz")) {
        return base;
      }
    }
  } catch (_) {
    /* fall through */
  }
  return DEFAULT_FILENAME_HINT;
}

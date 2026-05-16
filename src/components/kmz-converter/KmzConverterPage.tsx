import { FormEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router";
import { useContextMenuDisabled } from "../../hooks";
import { convertGoogleMapUrlToGpx } from "../../utils/maps/convertGoogleMapUrlToGpx";
import { HomeIcon } from "../ui/icons";

const PLACEHOLDER_URL =
  "https://www.google.com/maps/d/u/0/viewer?mid=...";

export default function KmzConverterPage(): ReactElement {
  useContextMenuDisabled();
  const navigate = useNavigate();
  const [mapUrl, setMapUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await convertGoogleMapUrlToGpx(mapUrl);
      setSuccess(
        "Downloaded " +
          result.filename +
          " (" +
          String(result.bytesWritten) +
          " bytes)",
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Conversion failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="select-none text-center h-screen max-h-screen overflow-y-hidden">
      <div
        className="
          absolute top-3 left-3
          hover:cursor-pointer hover:animate-wiggle
          active:animate-jump-out
          z-20
        "
        onClick={function onHome(): void {
          navigate("/");
        }}
      >
        <HomeIcon />
      </div>

      <div className="absolute w-full h-full z-[9]">
        <div className="flex flex-row justify-center h-full items-center px-4">
          <div
            className="
              w-full max-w-lg
              text-zinc-300
              bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 from-30% to-90%
              border-[1px] border-zinc-800/30
              flex flex-col gap-6 p-6
              shadow-2xl rounded-[6px]
            "
          >
            <h1 className="text-2xl font-mono font-normal text-zinc-200 text-center">
              KMZ Converter
            </h1>
            <p className="text-sm font-mono text-zinc-400 text-center">
              Paste a Google My Maps link. We fetch the map data and download a
              GPX file.
            </p>

            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="map-url">
                Google My Maps URL
              </label>
              <input
                id="map-url"
                type="url"
                required
                value={mapUrl}
                onChange={function onUrlChange(e): void {
                  setMapUrl(e.target.value);
                }}
                placeholder={PLACEHOLDER_URL}
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-zinc-900/60 border border-zinc-600/40
                  text-zinc-100 font-mono text-sm
                  placeholder:text-zinc-500
                  focus:outline-none focus:border-zinc-400
                "
              />

              {error != null ? (
                <p className="text-sm font-mono text-red-300 text-center">
                  {error}
                </p>
              ) : null}

              {success != null ? (
                <p className="text-sm font-mono text-emerald-300 text-center">
                  {success}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full py-2 px-6 rounded-lg shadow-lg
                  bg-zinc-200 border-zinc-900/30 border-[1px] text-zinc-900
                  pressable font-bold font-mono
                  hover:underline active:italic transition-all duration-500
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {loading ? "Converting…" : "Convert & download"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

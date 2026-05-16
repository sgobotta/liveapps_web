import {
  FormEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  localizeMapConverterError,
  TranslateFn,
} from '../../i18n/mapConverterError';
import { convertGoogleMapUrlToGpx } from '../../utils/maps/convertGoogleMapUrlToGpx';

const PLACEHOLDER_URL = 'https://www.google.com/maps/d/u/0/viewer?mid=...';

const IGPSPORT_UPLOAD_URL = 'https://i.igpsport.com/explorer/upload';

export default function KmzConverterDialog(): ReactElement {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mapUrl, setMapUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onClose = useCallback(
    function onClose(): void {
      navigate('/');
    },
    [navigate],
  );

  useEffect(
    function onMount(): () => void {
      function onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
          onClose();
        }
      }

      document.addEventListener('keydown', onKeyDown);
      return function onUnmount(): void {
        document.removeEventListener('keydown', onKeyDown);
      };
    },
    [onClose],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await convertGoogleMapUrlToGpx(mapUrl);
      setSuccess(
        t('kmzConverter.downloadSuccess', {
          filename: result.filename,
          bytes: String(result.bytesWritten),
        }),
      );
    } catch (err) {
      setError(localizeMapConverterError(t as TranslateFn, err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kmz-converter-title"
    >
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="relative flex h-full items-center justify-center px-4 pointer-events-none">
        <div
          className="
            pointer-events-auto relative
            w-full max-w-lg
            text-zinc-300
            bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 from-30% to-90%
            border-[1px] border-zinc-800/30
            flex flex-col gap-6 p-6
            shadow-2xl rounded-[6px]
          "
          onClick={function stopBackdropClick(event): void {
            event.stopPropagation();
          }}
        >
          <button
            type="button"
            aria-label={t('common.close')}
            onClick={onClose}
            className="
              absolute top-3 right-3
              w-8 h-8 rounded-lg
              text-zinc-400 hover:text-zinc-200
              font-mono text-xl leading-none
              hover:cursor-pointer
            "
          >
            ×
          </button>

          <h1
            id="kmz-converter-title"
            className="text-2xl font-mono font-normal text-zinc-200 text-center"
          >
            {t('kmzConverter.title')}
          </h1>
          <p className="text-sm font-mono text-zinc-400 text-center">
            {t('kmzConverter.subtitle')}
          </p>

          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="map-url">
              {t('kmzConverter.mapUrlLabel')}
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

            <p className="text-xs font-mono text-right">
              <a
                href={IGPSPORT_UPLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-zinc-400 hover:text-zinc-200"
              >
                {t('kmzConverter.uploadRoutes')}
              </a>
            </p>

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
              {loading
                ? t('kmzConverter.converting')
                : t('kmzConverter.convert')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

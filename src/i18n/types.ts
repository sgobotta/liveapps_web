export const SUPPORTED_LOCALES = ['en', 'es-AR'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const LOCALE_STORAGE_KEY = 'liveapps.locale';

export function isSupportedLocale(value: string): value is SupportedLocale {
  return SUPPORTED_LOCALES.indexOf(value as SupportedLocale) !== -1;
}

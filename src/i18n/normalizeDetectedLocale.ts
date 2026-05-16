import { DEFAULT_LOCALE, isSupportedLocale, SupportedLocale } from './types';

export function normalizeDetectedLocale(tag: string): SupportedLocale {
  if (tag == null || tag === '') {
    return DEFAULT_LOCALE;
  }

  if (isSupportedLocale(tag)) {
    return tag;
  }

  const lower = tag.toLowerCase();

  if (lower === 'es-ar' || lower.indexOf('es') === 0) {
    return 'es-AR';
  }

  if (lower.indexOf('en') === 0) {
    return 'en';
  }

  return DEFAULT_LOCALE;
}

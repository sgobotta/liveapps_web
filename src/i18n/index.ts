import i18nInstance, { changeLanguage } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import esAR from './locales/es-AR.json';
import { normalizeDetectedLocale } from './normalizeDetectedLocale';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, SupportedLocale } from './types';

function syncDocumentLanguage(locale: SupportedLocale): void {
  document.documentElement.lang = locale;
}

function readLocaleAfterDetection(): SupportedLocale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored != null && stored !== '') {
      return normalizeDetectedLocale(stored);
    }
  } catch {
    // ignore quota / private mode
  }

  if (typeof navigator !== 'undefined' && navigator.language != null) {
    return normalizeDetectedLocale(navigator.language);
  }

  return DEFAULT_LOCALE;
}

void i18nInstance
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      resources: {
        en: { translation: en },
        'es-AR': { translation: esAR },
      },
      fallbackLng: DEFAULT_LOCALE,
      supportedLngs: ['en', 'es-AR'],
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: LOCALE_STORAGE_KEY,
        convertDetectedLanguage: function convertDetectedLanguage(
          lng: string,
        ): string {
          return normalizeDetectedLocale(lng);
        },
      },
      interpolation: {
        escapeValue: false,
      },
    },
    function onI18nInitialized(): void {
      syncDocumentLanguage(readLocaleAfterDetection());
    },
  );

export async function setAppLocale(locale: SupportedLocale): Promise<void> {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // ignore quota / private mode
  }
  syncDocumentLanguage(locale);
  await changeLanguage(locale);
}

export default i18nInstance;
export * from './types';

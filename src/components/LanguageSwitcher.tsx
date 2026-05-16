import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { setAppLocale } from '../i18n';
import { normalizeDetectedLocale } from '../i18n/normalizeDetectedLocale';
import { SupportedLocale, SUPPORTED_LOCALES } from '../i18n/types';

export default function LanguageSwitcher(): ReactElement {
  const { i18n, t } = useTranslation();
  const resolvedLanguage =
    i18n.resolvedLanguage == null ? i18n.language : i18n.resolvedLanguage;
  const currentLocale = normalizeDetectedLocale(resolvedLanguage);

  function onLocaleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const nextLocale = event.target.value as SupportedLocale;
    void setAppLocale(nextLocale);
  }

  return (
    <label className="fixed top-2 right-2 z-50 flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-zinc-300">
      <span className="sr-only">{t('language.label')}</span>
      <select
        value={currentLocale}
        onChange={onLocaleChange}
        aria-label={t('language.label')}
        className="
          bg-zinc-600/40 border border-zinc-700/50 rounded-md
          px-2 py-1 text-zinc-300
          focus:outline-none focus:border-zinc-500
          cursor-pointer
        "
      >
        {SUPPORTED_LOCALES.map(function renderLocale(locale: SupportedLocale) {
          return (
            <option key={locale} value={locale}>
              {t('language.' + locale)}
            </option>
          );
        })}
      </select>
    </label>
  );
}

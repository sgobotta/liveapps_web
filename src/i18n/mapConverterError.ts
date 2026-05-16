export type TranslateFn = (
  key: string,
  options?: Record<string, string>,
) => string;

export function localizeMapConverterError(
  t: TranslateFn,
  err: unknown,
): string {
  if (!(err instanceof Error)) {
    return t('kmzConverter.errors.conversionFailed');
  }

  const message = err.message;

  if (message === 'URL is required.') {
    return t('kmzConverter.errors.urlRequired');
  }

  if (message === 'Invalid URL.') {
    return t('kmzConverter.errors.invalidUrl');
  }

  if (message === 'Could not find a map id (mid) in the URL.') {
    return t('kmzConverter.errors.mapIdNotFound');
  }

  const httpMatch = /^HTTP (\d+) while fetching map data\.$/.exec(message);
  if (httpMatch != null) {
    return t('kmzConverter.errors.httpFetch', { status: httpMatch[1] });
  }

  return message;
}

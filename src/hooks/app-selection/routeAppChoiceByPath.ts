import { AppChoice } from '../../types';

/** Maps routes to the app that should appear selected on the homepage. */
export const routeAppChoiceByPath: Record<string, AppChoice> = {
  '/kmz-converter': AppChoice.KmzConverter,
};

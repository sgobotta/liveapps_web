import { useEffect } from 'react';
import { AppChoice, AppSelectionOption } from '../../types';
import { routeAppChoiceByPath } from './routeAppChoiceByPath';

type RouteSyncedSelectionProps = {
  pathname: string;
  selections: AppSelectionOption[];
  currentChoice: AppChoice;
  chooseSelection: (option: AppSelectionOption) => void;
};

function getAppChoiceForPath(pathname: string): AppChoice | undefined {
  return routeAppChoiceByPath[pathname];
}

function findOptionByChoice(
  selections: AppSelectionOption[],
  choice: AppChoice,
): AppSelectionOption | undefined {
  return selections.find(function optionMatchesChoice(
    option: AppSelectionOption,
  ): boolean {
    return option.choice === choice;
  });
}

export function useRouteSyncedSelection({
  pathname,
  selections,
  currentChoice,
  chooseSelection,
}: RouteSyncedSelectionProps): void {
  useEffect(
    function syncSelectionWithRoute(): void {
      const choiceForRoute = getAppChoiceForPath(pathname);
      if (choiceForRoute == null) {
        return;
      }

      if (currentChoice === choiceForRoute) {
        return;
      }

      const optionForRoute = findOptionByChoice(selections, choiceForRoute);
      if (optionForRoute != null) {
        chooseSelection(optionForRoute);
      }
    },
    [pathname, selections, chooseSelection, currentChoice],
  );
}

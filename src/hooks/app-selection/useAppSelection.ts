import { useEffect, useState } from 'react';
import { AppSelectionOption } from '../../types';
import { AppSelectionI } from '../../interfaces';

type AppSelectionProps = {
  options: AppSelectionOption[];
};

function initOptions(options: AppSelectionOption[]): AppSelectionOption[] {
  return options.map(function withIndex(
    appSelectionOption: AppSelectionOption,
    index: number,
  ): AppSelectionOption {
    return {
      ...appSelectionOption,
      index,
    };
  });
}

export const useAppSelection = ({
  options,
}: AppSelectionProps): AppSelectionI => {
  const initialSelections = initOptions(options);

  const [selections, setSelections] =
    useState<AppSelectionOption[]>(initialSelections);
  const [currentSelection, setCurrentSelection] = useState<AppSelectionOption>(
    initialSelections[0],
  );

  useEffect(
    function syncOptionsWithLocale(): void {
      const nextSelections = initOptions(options);
      setSelections(nextSelections);
      setCurrentSelection(function keepChoice(prevSelection): AppSelectionOption {
        const matched = nextSelections.find(function sameChoice(
          option: AppSelectionOption,
        ): boolean {
          return option.choice === prevSelection.choice;
        });
        return matched == null ? nextSelections[0] : matched;
      });
    },
    [options],
  );

  function nextSelection(option: AppSelectionOption): void {
    const index = selections.indexOf(option);
    const nextOption = selections[(index + 1) % selections.length];
    setCurrentSelection(nextOption);
  }

  function previousSelection(option: AppSelectionOption): void {
    const index = selections.indexOf(option);
    const previousOption =
      selections[(index - 1 + selections.length) % selections.length];
    setCurrentSelection(previousOption);
  }

  function chooseSelection(option: AppSelectionOption): void {
    const index = selections.indexOf(option);
    const selection = selections[index];
    setCurrentSelection(selection);
  }

  return {
    chooseSelection,
    currentSelection,
    nextSelection,
    previousSelection,
    selections,
  };
};

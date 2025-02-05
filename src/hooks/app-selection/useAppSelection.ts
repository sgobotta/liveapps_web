import { useState } from 'react';
import { AppChoice, AppSelectionOption } from '../../types';
import { AppSelectionI } from '../../interfaces';

type AppSelectionProps = {
  options: AppChoice[];
};

export const useAppSelection = ({
  options,
}: AppSelectionProps): AppSelectionI => {
  const selectionOptions: AppSelectionOption[] = initOptions(options);

  const [selections] = useState<AppSelectionOption[]>(selectionOptions);
  const [currentSelection, setCurrentSelection] = useState<AppSelectionOption>(
    selectionOptions[0],
  );

  function initOptions(options: AppChoice[]): AppSelectionOption[] {
    return options.map((appChoice: AppChoice, index: number) => {
      return {
        name: appChoice,
        index,
      };
    });
  }

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

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

  const [getSelections] = useState<AppSelectionOption[]>(selectionOptions);
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
    const index = getSelections.indexOf(option);
    const nextOption = getSelections[(index + 1) % getSelections.length];
    setCurrentSelection(nextOption);
  }

  function previousSelection(option: AppSelectionOption): void {
    const index = getSelections.indexOf(option);
    const previousOption =
      getSelections[(index - 1 + getSelections.length) % getSelections.length];
    setCurrentSelection(previousOption);
  }

  function chooseSelection(option: AppChoice): void {
    const selection = getSelections.find(
      ({ name }) => name === option,
    ) as AppSelectionOption;
    setCurrentSelection(selection);
  }

  return {
    chooseSelection,
    currentSelection,
    nextSelection,
    previousSelection,
  };
};

import { useState } from 'react';
import { AppChoice } from '../../components/app-selection/ApplicationSelection';
import {
  CircularLinkedListNode,
  useCircularLinkedList,
} from '../data-structures/useCircularLinkedList';

type AppSelectionProps = {
  options: AppChoice[];
};

interface AppSelectionI {
  nextSelection: (name: AppChoice) => AppSelectionOption;
  previousSelection: (name: AppChoice) => AppSelectionOption;
  getSelectionOptions: () => AppSelectionOption[];
}

type AppSelectionOption = {
  name: AppChoice;
  index: number;
};

export const useAppSelection = ({
  options,
}: AppSelectionProps): AppSelectionI => {
  const {
    create: createLinkedList,
    getNext: getNextElement,
    getPrevious: getPreviousElement,
  } = useCircularLinkedList();

  const _options: AppSelectionOption[] = options.map(
    (applicationChoice, index) => {
      return {
        name: applicationChoice,
        index,
      };
    },
  );

  const __options = createLinkedList(_options);

  const [getOption] = useState<CircularLinkedListNode | null>(__options);

  function getSelectionOptions(): AppSelectionOption[] {
    return _options;
  }

  // function _findOptionByName(options: AppSelectionOption[], optionName: AppChoice): AppSelectionOption {
  //   return options.find((appSelectionOption: AppSelectionOption) => {
  //     return appSelectionOption.name === optionName
  //   }) as AppSelectionOption
  // }

  function nextSelection(name: AppChoice): AppSelectionOption {
    const nextElement = getNextElement(getOption);
    return nextElement!.data;
  }

  function previousSelection(name: AppChoice): AppSelectionOption {
    const previousElement = getPreviousElement(getOption);
    return previousElement!.data;
  }

  return {
    getSelectionOptions,
    nextSelection,
    previousSelection,
  };
};

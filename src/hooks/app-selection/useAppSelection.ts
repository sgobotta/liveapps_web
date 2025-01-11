import { useState } from 'react';
import {
  CircularLinkedListNode,
  useCircularLinkedList,
} from '../data-structures/useCircularLinkedList';
import { AppChoice, AppSelectionOption } from '../../types';
import { AppSelectionI } from '../../interfaces';

type AppSelectionProps = {
  options: AppChoice[];
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
    (appChoice: AppChoice, index: number) => {
      return {
        name: appChoice,
        index,
      };
    },
  );

  const firstOption = createLinkedList(_options);

  const [getOption] = useState<CircularLinkedListNode | null>(firstOption);

  function nextSelection(): AppSelectionOption {
    const nextElement = getNextElement(getOption);
    return nextElement!.data;
  }

  function previousSelection(): AppSelectionOption {
    const previousElement = getPreviousElement(getOption);
    return previousElement!.data;
  }

  return {
    nextSelection,
    previousSelection,
  };
};

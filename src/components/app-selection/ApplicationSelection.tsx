import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useAppSelection } from '../../hooks/app-selection';
import { AppChoice, AppSelectionOption } from '../../types';
import ApplicationOptionComponent from './ApplicationOption';
// import TileGameComponent from './components/tile-game/TileGame';

export default function ApplicationSelection(): ReactElement {
  const { nextSelection, previousSelection, currentSelection } =
    useAppSelection({
      options: [AppChoice.PictureCards, AppChoice.Finance, AppChoice.LiveDj],
    });

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        previousSelection(currentSelection);
      }
      if (event.key === 'ArrowDown') {
        nextSelection(currentSelection);
      }
      if (event.key === 'Enter') {
        console.log('getSelectedOption???', currentSelection);
      }
    },
    [currentSelection],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  function isSelected(
    selectedOption: AppChoice,
    applicationChoice: AppChoice,
  ): boolean {
    return selectedOption === applicationChoice;
  }

  return (
    <div
      className="
        font-mono m-auto sm:w-full md:w-full lg:w-full xl:w-3/4 2xl:w-3/4
        sm:p-24 md:p-24 lg:p-24 align-middle
        absolute flex flex-col items-start
        top-1/2 sm:left-1/2
        transform sm:-translate-x-1/2 -translate-y-1/2
        text-3xl
        pl-8
      "
    >
      <ApplicationOptionComponent
        name="Picture Cards"
        isSelected={isSelected(currentSelection.name, AppChoice.PictureCards)}
      />
      <ApplicationOptionComponent
        name="Finance"
        isSelected={isSelected(currentSelection.name, AppChoice.Finance)}
      />
      <ApplicationOptionComponent
        name="LiveDj"
        isSelected={isSelected(currentSelection.name, AppChoice.LiveDj)}
      />
    </div>
  );
}

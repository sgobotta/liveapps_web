import { ReactElement, useEffect, useState } from 'react';
import ApplicationOption from './ApplicationOption';
import { useAppSelection } from '../../hooks/app-selection';
// import TileGameComponent from './components/tile-game/TileGame';

export enum AppChoice {
  PictureCards,
  Finance,
}

export default function ApplicationSelection(): ReactElement {
  const { nextSelection, previousSelection } = useAppSelection({
    options: [AppChoice.PictureCards, AppChoice.Finance],
  });
  const initialOption = AppChoice.PictureCards;

  const [getSelectedOption, _setSelectedOption] =
    useState<AppChoice>(initialOption);

  function onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'ArrowUp') {
      _setSelectedOption(previousSelection(getSelectedOption).name);
    }
    if (e.key === 'ArrowDown') {
      _setSelectedOption(nextSelection(getSelectedOption).name);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  function isSelected(selectedOption: AppChoice, applicationChoice: AppChoice) {
    return selectedOption === applicationChoice;
  }

  return (
    <div
      className="
        font-mono m-auto sm:w-full md:w-full lg:w-full xl:w-3/4 2xl:w-2/4
        sm:p-24 md:p-24 lg:p-24 align-middle
        absolute flex flex-col items-start
        top-1/2 sm:left-1/2
        transform sm:-translate-x-1/2 -translate-y-1/2
        text-3xl
      "
    >
      <ApplicationOption
        name="Picture Cards"
        isSelected={isSelected(getSelectedOption, AppChoice.PictureCards)}
      />
      <ApplicationOption
        name="Finance"
        isSelected={isSelected(getSelectedOption, AppChoice.Finance)}
      />
    </div>
  );
}

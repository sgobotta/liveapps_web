import { ReactElement, useCallback, useEffect } from 'react';
import { useAppSelection } from '../../hooks/app-selection';
import { AppChoice, AppSelectionOption } from '../../types';
import ApplicationOptionComponent from './ApplicationOption';
import { useMouseWheel } from '../../hooks/listeners/useScrolling';
import { ApplicationPreview } from './ApplicationPreview';
// import TileGameComponent from './components/tile-game/TileGame';

export default function ApplicationSelection(): ReactElement {
  const {
    chooseSelection,
    currentSelection,
    nextSelection,
    previousSelection,
    selections,
  } = useAppSelection({
    options: [
      { choice: AppChoice.PictureCards, name: 'Picture Cards' },
      { choice: AppChoice.Finance, name: 'Finance' },
      { choice: AppChoice.LiveDj, name: 'LiveDj' },
    ],
  });

  const { wheelDirection, wheelUpdated } = useMouseWheel();

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        previousSelection(currentSelection);
      }
      if (event.key === 'ArrowDown') {
        nextSelection(currentSelection);
      }
      if (event.key === 'Enter') {
        console.log('Selected Option: ', currentSelection);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSelection],
  );

  useEffect(() => {
    switch (wheelDirection) {
      case 0:
        break;

      case -1:
        nextSelection(currentSelection);
        break;

      case 1:
        previousSelection(currentSelection);
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wheelUpdated]);

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

  function getBgColor(index: number) {
    switch (index) {
      case 0:
        return 'bg-secondary-300';

      case 1:
        return 'bg-accent-p-300';

      case 2:
        return 'bg-primary-300';

      default:
        break;
    }
  }

  return (
    <div>
      <div
        className="
        w-full h-full
        align-middle
        absolute flex flex-col items-center
        overflow-hidden
      "
      >
        {selections.map((selection: AppSelectionOption, index) => (
          <ApplicationPreview
            isSelected={isSelected(currentSelection.choice, selection.choice)}
            extraClasses={`
              ${getBgColor(index)}
              ${
                isSelected(currentSelection.choice, selection.choice)
                  ? 'translate-x-[0%]'
                  : 'translate-x-[400%]'
              }
            `}
          />
        ))}
      </div>
      <div
        className="
          font-mono m-auto sm:w-full md:w-full lg:w-full xl:w-3/4 2xl:w-3/4
          sm:p-24 md:p-24 lg:p-24 align-middle
          absolute flex flex-col items-start
          top-2/3 sm:top-3/4 sm:left-1/2
          transform sm:-translate-x-1/2 -translate-y-1/2
          text-3xl
          pl-10
        "
      >
        {selections.map((selection: AppSelectionOption) => (
          <ApplicationOptionComponent
            isSelected={isSelected(currentSelection.choice, selection.choice)}
            name={selection.name}
            onClick={() => chooseSelection(selection)}
          />
        ))}
      </div>
    </div>
  );
}

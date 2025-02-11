import { ReactElement, useCallback, useEffect } from 'react';
import { useAppSelection } from '../../hooks/app-selection';
import { AppChoice, AppSelectionOption } from '../../types';
import ApplicationOptionComponent from './ApplicationOption';
import { useMouseWheel } from '../../hooks/listeners/useScrolling';
import { ApplicationPreview } from './ApplicationPreview';
import { openTab } from '../../utils';
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
      {
        choice: AppChoice.PictureCards,
        name: 'Picture Cards',
        onSelect: () => {
          console.log('Selected Picture Cards');
        },
      },
      {
        choice: AppChoice.Finance,
        name: 'Finance',
        onSelect: () => {
          openTab('https://finance.liveapps.com.ar');
        },
      },
      {
        choice: AppChoice.LiveDj,
        name: 'LiveDj',
        onSelect: () => {
          openTab('https://dj.liveapps.com.ar');
        },
      },
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
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSelection],
  );

  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        currentSelection.onSelect();
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

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyUp]);

  function isSelected(
    selectedOption: AppChoice,
    applicationChoice: AppChoice,
  ): boolean {
    return selectedOption === applicationChoice;
  }

  function getBgColor(choice: AppChoice) {
    switch (choice) {
      case AppChoice.PictureCards:
        return {
          sliderClasses: 'bg-zinc-300 group-active:bg-blue-300',
          previewClasses: 'bg-zinc-300',
        };

      case AppChoice.Finance:
        return {
          sliderClasses: 'bg-zinc-300 group-active:bg-amber-200',
          previewClasses: 'bg-zinc-300',
        };

      case AppChoice.LiveDj:
        return {
          sliderClasses: 'bg-zinc-300 group-active:bg-red-300',
          previewClasses: 'bg-zinc-300',
        };

      default:
        return { sliderClasses: 'bg-zinc-300', previewClasses: 'bg-zinc-300' };
    }
  }

  return (
    <div>
      <div
        className="
        w-full h-full
        absolute flex flex-col items-center
        overflow-hidden
      "
      >
        {selections.map((selection: AppSelectionOption, index) => (
          <ApplicationPreview
            choice={selection.choice}
            key={`preview-${String(selection.choice).toLowerCase()}`}
            previewClasses={`
              ${getBgColor(selection.choice).previewClasses}
              ${
                isSelected(currentSelection.choice, selection.choice)
                  ? 'translate-x-[0%]'
                  : 'translate-x-[400%]'
              }
            `}
            sliderClasses={`
              ${getBgColor(selection.choice).sliderClasses}
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
          sm:p-14
          absolute flex flex-col items-start
          top-[60%] sm:top-2/4 sm:left-0
          text-3xl
          pl-10
        "
      >
        {selections.map((selection: AppSelectionOption) => (
          <ApplicationOptionComponent
            key={`option-${String(selection.choice).toLowerCase()}`}
            isSelected={isSelected(currentSelection.choice, selection.choice)}
            name={selection.name}
            onClick={() => chooseSelection(selection)}
          />
        ))}
      </div>
    </div>
  );
}

import { ReactElement, useCallback, useEffect } from 'react';
import { useAppSelection } from '../../hooks/app-selection';
import { AppChoice, AppSelectionOption } from '../../types';
import ApplicationOptionComponent from './ApplicationOption';
import { useMouseWheel } from '../../hooks/listeners/useScrolling';
// import TileGameComponent from './components/tile-game/TileGame';

function ApplicationPreview(): ReactElement {
  return (
    <div className='relative p-10 h-64 w-64'>
      <div className='
        absolute top-[50%] left-[40%]
        bg-accent-p-300/20
        h-60 w-60
        rounded-3xl
        blur-sm
      '/>
      <div className='
        absolute top-[32%] left-[20%]
        bg-accent-p-300/100
        h-32 w-32
        rounded-[3.0rem]
        blur-[0.12rem]
      '/>
      <div className='
        absolute top-[35%] left-[78%]
        bg-accent-p-300/100
        h-32 w-32
        rounded-[3.0rem]
        blur-[0.12rem]
      '/>
      <div className='
        absolute top-[100%] left-[90%]
        bg-rose-400/100
        h-32 w-32
        rounded-[3.0rem]
        blur-[0.1rem]
      '/>
      <div className='
        absolute top-[88%] left-[28%]
        bg-accent-p-300/100
        h-32 w-32
        rounded-[3.0rem]
        blur-[0.1rem]
      '/>
      <div className='
        absolute top-[40%] left-[30%]
        bg-accent-p-300/100
        h-60 w-60
        rounded-3xl
        blur-[0.07rem]
      '>
        <p className='text-white'>
        </p>
      </div>
    </div>
  )
}

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

  return (
    <div>
      <div className='
        w-full
        align-middle
        absolute flex flex-col items-center
        top-[10%]
      '>
        <ApplicationPreview />
      </div>
      <div
        className="
          font-mono m-auto sm:w-full md:w-full lg:w-full xl:w-3/4 2xl:w-3/4
          sm:p-24 md:p-24 lg:p-24 align-middle
          absolute flex flex-col items-start
          top-3/4 sm:top-3/4 sm:left-1/2
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

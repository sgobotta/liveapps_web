import { ReactElement } from 'react';
import livedj from '../../svg/live-dj-iso-black.svg';
import { AppChoice } from '../../types';

type ApplicationPreviewProps = {
  choice: AppChoice;
  isSelected?: boolean;
  extraClasses?: string;
};

function FinancePreview(): ReactElement {
  return <div>Finance</div>;
}

function LiveDjPreview(): ReactElement {
  return (
    <div className="flex items-center">
      <img src={livedj} className="w-3/4 h-3/4" alt="livedj logo" />
    </div>
  );
}

function PictureCards(): ReactElement {
  return <div>Picture Cards</div>;
}

export function ApplicationPreview({
  choice,
  extraClasses = '',
}: ApplicationPreviewProps): ReactElement {
  function getContentByChoice(choice: AppChoice): ReactElement {
    switch (choice) {
      case AppChoice.Finance:
        return <FinancePreview />;

      case AppChoice.LiveDj:
        return <LiveDjPreview />;

      case AppChoice.PictureCards:
        return <PictureCards />;
    }
  }

  const content = getContentByChoice(choice);

  return (
    <div className="absolute">
      <div className="relative p-10 w-full h-[80vh]">
        <div
          className={`
          absolute
          top-[12%] left-[-66%]
          sm:top-[24%] sm:left-[40%]
          h-60 !w-screen
          sm:h-72 sm:w-72 
          rounded-3xl
          transition duration-[1s]
          ${extraClasses}
          bg-opacity-20
          blur-[2px]
        `}
        />
        <div
          className={`
          absolute
          top-[10%] left-[-50%]
          sm:top-[22%] sm:left-[70%]
          h-60 w-60 sm:h-72 sm:w-72 
          rounded-3xl
          blur-[0.05rem]
          transition duration-[1.25s]
          ${extraClasses}
          flex items-center justify-center
        `}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

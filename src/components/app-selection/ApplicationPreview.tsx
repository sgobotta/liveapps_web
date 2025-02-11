import { ReactElement } from 'react';
import livedj from '../../svg/live-dj-iso-black.svg';
import { AppChoice } from '../../types';
import { publicImage } from '../../utils';

type ApplicationPreviewProps = {
  choice: AppChoice;
  isSelected?: boolean;
  extraClasses?: string;
  previewClasses?: string;
  sliderClasses?: string;
};

function FinancePreview(): ReactElement {
  return (
    <div
      className="
      cursor-pointer
      animate-wiggle
      animate-duration-[5s]
      animate-iteration-infinite
      flex items-center justify-center
    "
    >
      <img
        alt="finance logo"
        draggable="false"
        className="w-full h-full rounded-xl"
        src={publicImage('images/finance/logo.png')}
      />
    </div>
  );
}

function LiveDjPreview(): ReactElement {
  return (
    <div
      className="
      cursor-pointer
      animate-jump
      animate-duration-[5s]
      animate-iteration-infinite
      flex items-center justify-center
    "
    >
      <img
        alt="livedj logo"
        draggable="false"
        className="w-3/4 h-3/4"
        src={livedj}
      />
    </div>
  );
}

function PictureCards(): ReactElement {
  return (
    <div className="cursor-pointer">
      <img
        alt="picture-cards logo"
        className="
          rounded-lg w-full h-full
          duration-1000 group-active:rounded-[5.5rem]
        "
        draggable="false"
        src={publicImage('images/picture-cards/logo.png')}
      />
    </div>
  );
}

export function ApplicationPreview({
  choice,
  extraClasses = '',
  previewClasses = '',
  sliderClasses = '',
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
    <div className="absolute group test-class">
      <div className="relative h-[80vh]">
        <div
          className={`
          absolute
          top-[12%] left-[-66%]
          sm:top-[24%] sm:left-[40%]
          h-60 !w-screen
          sm:h-72 sm:w-72 
          rounded-3xl
          ${sliderClasses}
          bg-opacity-20
          blur-[2px]
          transition-all duration-1000
          group-active:rounded-[5rem]
        `}
        />
        <div
          className={`
          absolute
          top-[10%] left-[-50%]
          sm:top-[22%] sm:left-[50%]
          ml-[1rem]
          h-60 w-60 sm:h-72 sm:w-72 
          rounded-3xl
          blur-[0.05rem]
          transition duration-[1.25s]
          ${previewClasses}
          flex items-center justify-center
          transition-all duration-500
          group-active:-translate-x-5 group-active:translate-y-4
          group-active:rounded-[5rem]
          group-active:shadow-inner
        `}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

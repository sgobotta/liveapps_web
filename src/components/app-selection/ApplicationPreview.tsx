import { ReactElement } from 'react';
import livedj from '../../svg/live-dj-iso-black.svg';
import { AppChoice } from '../../types';
import { publicImage } from '../../utils';
import useLongPress from '../../hooks/useLongPress';

type ApplicationPreviewProps = {
  choice: AppChoice;
  previewClasses?: string;
  sliderClasses?: string;
  onSelect: () => void;
};

interface ApplicationPreviewI {
  onSelect: () => void;
}

function FinancePreview({ onSelect }: ApplicationPreviewI): ReactElement {
  const onLongPress = useLongPress(onSelect);

  return (
    <div
      className="
        cursor-pointer
        animate-wiggle
        animate-duration-[5s]
        animate-iteration-infinite
        flex items-center justify-center
        duration-700
        hover:bg-amber-500/20 hover:rounded-2xl
        group-active:rounded-[5rem] group-active:bg-transparent
      "
      {...onLongPress}
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

function LiveDjPreview({ onSelect }: ApplicationPreviewI): ReactElement {
  const onLongPress = useLongPress(onSelect);

  return (
    <div
      className="
        cursor-pointer
        
        flex items-center justify-center
        duration-700
        w-full h-full
        hover:bg-red-500/20 hover:rounded-2xl
        group-active:rounded-[5rem] group-active:bg-transparent
        animate-wiggle animate-infinite
      "
      {...onLongPress}
    >
      <img
        alt="livedj logo"
        draggable="false"
        className="
          w-3/4 h-3/4
          animate-jump
          animate-duration-[5s]
          animate-iteration-infinite
        "
        src={livedj}
      />
    </div>
  );
}

function PictureCards({ onSelect }: ApplicationPreviewI): ReactElement {
  const onLongPress = useLongPress(onSelect);

  return (
    <div className="cursor-pointer" {...onLongPress}>
      <img
        alt="picture-cards logo"
        className="
          rounded-lg w-full h-full
          duration-1000 group-active:rounded-[5.5rem]
          group-active:translate-x-[0.1rem]
        "
        draggable="false"
        src={publicImage('images/picture-cards/logo.png')}
      />
    </div>
  );
}

export function ApplicationPreview({
  choice,
  previewClasses = '',
  sliderClasses = '',
  onSelect,
}: ApplicationPreviewProps): ReactElement {
  function getContentByChoice(choice: AppChoice): ReactElement {
    switch (choice) {
      case AppChoice.Finance:
        return <FinancePreview onSelect={onSelect} />;

      case AppChoice.LiveDj:
        return <LiveDjPreview onSelect={onSelect} />;

      case AppChoice.PictureCards:
        return <PictureCards onSelect={onSelect} />;
    }
  }

  const content = getContentByChoice(choice);

  return (
    <div className="absolute group ml-20 md:ml-60 lg:ml-0">
      <div className="relative h-[80vh]">
        <div
          className={`
            absolute
            top-[12%]
            sm:top-[24%]
            h-60 !w-[150vw]
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
            top-[10%]
            sm:top-[22%]
            ml-[1rem]
            h-60 w-60 sm:h-72 sm:w-72 
            rounded-3xl
            blur-[0.05rem]
            transition duration-[1.25s]
            ${previewClasses}
            flex items-center justify-center
            transition-all duration-1000
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

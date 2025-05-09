import { ReactElement } from 'react';
import livedj from '../../svg/live-dj-iso-black.svg';
import { AppChoice } from '../../types';
import { publicImage } from '../../utils';
import useLongPress from '../../hooks/useLongPress';
import TypewriterText from '../ui/TypewriterText';

type ApplicationPreviewProps = {
  choice: AppChoice;
  isSelected: boolean;
  previewClasses?: string;
  sliderClasses?: string;
  onSelect: () => void;
};

interface ApplicationPreviewI {
  onSelect: () => void;
}

type ApplicationDescriptionT = ReactElement;

function ApplicationDescriptionComponent({
  description,
}: {
  description: string;
}): ReactElement {
  return (
    <div className="text-white bg-zinc-900/50 p-2 rounded-lg">
      <p className="font-mono text-xs font-thin">
        <TypewriterText text={description} />
      </p>
    </div>
  );
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
          duration-700 group-active:rounded-[5.5rem]
          group-active:translate-x-[0.1rem]
          group-hover:rounded-3xl
        "
        draggable="false"
        src={publicImage('images/picture-cards/logo.png')}
      />
    </div>
  );
}

export function ApplicationPreview({
  choice,
  isSelected,
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

  function getDescriptionByChoice(choice: AppChoice): ApplicationDescriptionT {
    switch (choice) {
      case AppChoice.Finance:
        return (
          <ApplicationDescriptionComponent
            description={
              'Finance is a real-time currency tracking application that displays up-to-date exchange rates for the dollar in Argentina. The app shows historical price data and includes a CEDEAR calculator to compare local market prices against NASDAQ and NYSE stocks, helping users identify when foreign stocks are undervalued or overpriced in the local market.'
            }
          />
        );

      case AppChoice.LiveDj:
        return (
          <ApplicationDescriptionComponent
            description={
              'LiveDJ is a real-time video sharing app that lets you watch YouTube videos in sync with friends. Create a room, add videos to the queue, and chat while everyone experiences the same content simultaneously, no matter where they are.'
            }
          />
        );

      case AppChoice.PictureCards:
        return (
          <ApplicationDescriptionComponent
            description={
              'A picture card game where players match and collect illustrated cards based on similarity. Take turns drawing cards to form pairs. The visual elements on the cards are essential to gameplay, creating an engaging experience that combines memory and pattern recognition.'
            }
          />
        );
    }
  }

  function getPreviewClasses(isSelected: boolean): string {
    return isSelected ? 'translate-x-[0%]' : 'translate-x-[400%]';
  }

  function getSliderClasses(isSelected: boolean): string {
    return isSelected ? 'translate-x-[0%]' : 'translate-x-[400%]';
  }

  const content = getContentByChoice(choice);
  const description = getDescriptionByChoice(choice);

  return (
    <div className="absolute group left-[36%] sm:left-[50%] md:left-[60%] lg:left-[60%] w-2/4 sm:w-1/3 h-full">
      <div className="absolute h-[80vh]">
        <div
          className={`
            absolute
            top-[12%]
            sm:top-[24%]
            h-40 !w-[150vw]
            sm:h-40 sm:w-40
            lg:h-60 lg:w-60 
            rounded-3xl
            bg-opacity-20
            blur-[2px]
            transition-all duration-1000
            group-active:rounded-[5rem]
            ${getSliderClasses(isSelected)}
            ${sliderClasses}
          `}
        />
        <div
          className={`
            absolute
            top-[10%]
            sm:top-[22%]
            ml-[1rem]
            h-40 w-40
            sm:h-40 sm:w-40 
            lg:h-60 lg:w-60 
            rounded-3xl
            blur-[0.05rem]
            transition-all duration-[1.25s]
            flex items-center justify-center
            group-active:-translate-x-5 group-active:translate-y-4
            group-active:rounded-[5rem]
            group-active:shadow-inner
            ${getPreviewClasses(isSelected)}
            ${previewClasses}
          `}
        >
          <div className="absolute flex w-full h-full items-center justify-center">
            <div className="absolute bg-transparent border-zinc-900/30 group-hover:border-zinc-900 border-[1px] group-hover:border-2 w-40 h-40 rounded-full animate-[pressable-ping_1s_cubic-bezier(0,0,0.7,1)_alternate_infinite]" />
            <div className="absolute bg-transparent border-zinc-900/30 group-hover:border-zinc-900 border-[1px] group-hover:border-2 w-36 h-36 rounded-full animate-[pressable-ping_1.2s_cubic-bezier(0,0,0.7,1)_alternate_infinite]" />
            <div className="absolute bg-transparent border-zinc-900/30 group-hover:border-zinc-900 border-[1px] group-hover:border-2 w-32 h-32 rounded-full animate-[pressable-ping_1.4s_cubic-bezier(0,0,0.7,1)_alternate_infinite]" />
            <div className="absolute bg-transparent border-zinc-900/30 group-hover:border-zinc-900 border-[1px] group-hover:border-2 w-28 h-28 rounded-full animate-[pressable-ping_1.5s_cubic-bezier(0,0,0.7,1)_alternate_infinite]" />
            <div className="absolute bg-transparent border-zinc-900/30 group-hover:border-zinc-900 border-[1px] group-hover:border-2 w-24 h-24 rounded-full animate-[pressable-ping_1.7s_cubic-bezier(0,0,0.7,1)_alternate_infinite]" />
            <div className="hidden group-hover:block italic group-hover:animate-jump-in animate-jump-out text-zinc-900">
              Press me!
            </div>
          </div>
          <div className="transition duration-500 group-hover:opacity-15">
            {content}
          </div>
        </div>
      </div>
      {isSelected && (
        <div className="absolute bottom-[40%] sm:bottom-1/3 -left-28">
          {description}
        </div>
      )}
    </div>
  );
}

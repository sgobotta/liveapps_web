import { ReactElement, ReactNode, useEffect, useState } from 'react';

export enum TooltipPosition {
  Top,
  Bottom,
}

export type TooltipProps = {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  arrowColor?: string;
  autoShowDelay?: number | null;
  position?: TooltipPosition;
  children: ReactNode;
};

export default function Tooltip({
  text,
  textColor = 'text-yellow-200',
  backgroundColor = 'bg-zinc-600',
  arrowColor = 'text-zinc-600',
  autoShowDelay = null,
  position = TooltipPosition.Top,
  children,
}: TooltipProps): ReactElement {
  const [displayClass, setDisplayClass] = useState('hidden');

  useEffect(() => {
    if (autoShowDelay !== null) {
      setTimeout(() => {
        setDisplayClass('block');
      }, autoShowDelay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderPolygonByPosition(position: TooltipPosition) {
    if (position === TooltipPosition.Top) {
      return (
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
      );
    }
    if (position === TooltipPosition.Bottom) {
      return (
        <polygon className="fill-current" points="0,127.5 127.5,0 255,127.5" />
      );
    }
  }

  function getSvgAbsolutePosition(position: TooltipPosition) {
    switch (position) {
      case TooltipPosition.Top:
        return 'top-full';

      case TooltipPosition.Bottom:
        return '-top-1';
    }
  }

  function getContainerAbsolutePosition(position: TooltipPosition) {
    switch (position) {
      case TooltipPosition.Top:
        return 'bottom-14';

      case TooltipPosition.Bottom:
        return '-bottom-4';
    }
  }

  return (
    <div className="group">
      <div
        className={`
        absolute ${getContainerAbsolutePosition(position)} ${displayClass} group-hover:block
        transition duration-500
        animate-jump-in
      `}
      >
        <div
          className={`${backgroundColor} ${textColor} font-bold text-xs rounded py-1 px-3 bottom-full`}
        >
          {text}
          <svg
            className={`absolute ${arrowColor} h-2 w-full left-0 bottom-full ${getSvgAbsolutePosition(position)}`}
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
          >
            {renderPolygonByPosition(position)}
          </svg>
        </div>
      </div>
      {children}
    </div>
  );
}

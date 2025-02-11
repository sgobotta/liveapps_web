import { ReactElement } from 'react';

export type TooltipProps = {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  arrowColor?: string;
};

export default function Tooltip({
  text,
  textColor = 'text-yellow-200',
  backgroundColor = 'bg-zinc-600',
  arrowColor = 'text-zinc-600',
}: TooltipProps): ReactElement {
  return (
    <div
      className={`${backgroundColor} ${textColor} font-bold text-xs rounded py-1 px-3 bottom-full`}
    >
      {text}
      <svg
        className={`absolute ${arrowColor} h-2 w-full left-0 top-full`}
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
      >
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  );
}

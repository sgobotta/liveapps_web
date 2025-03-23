import { ReactElement } from 'react';

export const PauseIcon = (): ReactElement => {
  return (
    <svg
      className="group w-10 h-10"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          x="6"
          y="4"
          width="4"
          height="16"
          className="fill-zinc-400 group-hover:fill-zinc-300 transition duration-300"
        ></rect>
        <rect
          x="14"
          y="4"
          width="4"
          height="16"
          className="fill-zinc-400 group-hover:fill-zinc-300 transition duration-300"
        ></rect>
      </g>
    </svg>
  );
};

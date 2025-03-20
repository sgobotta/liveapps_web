import { ReactElement } from 'react';
import { ReactComponent as Octocat } from '../svg/github.svg';
import Tooltip, { TooltipPosition } from './ui/Tooltip';

export default function GithubButton(): ReactElement {
  return (
    <Tooltip
      text="Star Me!"
      autoShowDelay={3000}
      position={TooltipPosition.Top}
    >
      <a
        href="https://github.com/sgobotta/liveapps_web"
        target="_blank"
        rel="noreferrer"
      >
        <Octocat
          className={`
          transition duration-500
          cursor-default hover:cursor-pointer
          fill-accent-s-300 stroke-accent-s-700
          hover:fill-primary-300 hover:stroke-primary-700 hover:animate-jump
          active:fill-accent-p-500 active:stroke-accent-p-900
          active:shadow-2xl active:scale-95
        `}
        />
      </a>
    </Tooltip>
  );
}

import { ReactElement, useEffect, useState } from 'react';
import { ReactComponent as Octocat } from '../svg/github.svg';
import Tooltip from './ui/Tooltip';

export default function GithubButton(): ReactElement {
  const [displayClass, setDisplayClass] = useState('hidden');

  useEffect(() => {
    setTimeout(() => {
      setDisplayClass('block');
    }, 5000);
  }, []);

  return (
    <div className="group">
      <div
        className={`
        absolute bottom-14 ${displayClass} group-hover:block
        transition duration-500
        animate-jump-in
      `}
      >
        <Tooltip text="Star Me!" />
      </div>
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
    </div>
  );
}

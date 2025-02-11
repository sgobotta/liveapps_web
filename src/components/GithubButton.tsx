import { ReactComponent as Octocat } from '../svg/github.svg';

export default function GithubButton() {
  return (
    <div className="group">
      <div
        className="
        absolute bottom-14 hidden group-hover:block
        transition duration-500
        animate-jump-in
      "
      >
        <div className="bg-zinc-600 text-yellow-200 font-bold text-xs rounded py-1 px-3 bottom-full">
          Star Me!
          <svg
            className="absolute text-zinc-600 h-2 w-full left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
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

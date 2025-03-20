import { TileScoreboard } from '../../types';

export type GameStatsProps = {
  scoreboard: TileScoreboard;
};

export default function GameStats({ scoreboard }: GameStatsProps) {
  return (
    <div className="absolute top-0 w-full">
      <div
        className="
          mx-20 sm:mx-40 lg:mx-64 xl:mx-96
          px-4 sm:px-4 md:px-4 lg:px-4
          py-4
          border-[1px] border-zinc-700 bg-zinc-800 rounded-b-md
        "
      >
        <div className="grid grid-cols-4 grid-rows-1 grid-flow-col justify-items-center">
          <Attempts value={scoreboard.attempts} />
          <Matches value={scoreboard.matches} />
          <Accuracy value={scoreboard.accuracy} />
          <Streak value={scoreboard.streak} />
        </div>
      </div>
    </div>
  );
}

function Attempts({ value }: { value: number }) {
  return (
    <div>
      <span className="text-zinc-300 text-xl">
        🎯
        <span className="p-2 text-base font-bold ">{value}</span>
      </span>
    </div>
  );
}

function Matches({ value }: { value: number }) {
  return (
    <div>
      <span className="text-zinc-300 text-xl">
        ✅<span className="p-2 text-base font-bold ">{value}</span>
      </span>
    </div>
  );
}

function Accuracy({ value }: { value: number }) {
  return (
    <div>
      <span className="text-zinc-300 text-xl">
        📊<span className="p-2 text-base font-bold ">{value}%</span>
      </span>
    </div>
  );
}

function Streak({ value }: { value: number }) {
  return (
    <div>
      <span className="text-zinc-300 text-xl">
        🔥<span className="p-2 text-base font-bold ">{value}</span>
      </span>
    </div>
  );
}

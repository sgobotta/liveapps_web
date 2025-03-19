import { TileScoreboard } from '../../types';

export type GameStatsProps = {
  scoreboard: TileScoreboard;
};

export default function GameStats({ scoreboard }: GameStatsProps) {
  return (
    <div className="px-4 sm:px-12 md:px-12 lg:px-12">
      <div className="grid grid-cols-4 grid-rows-2 grid-flow-col">
        <Attempts value={scoreboard.attempts} />
        <Matches value={scoreboard.matches} />
        <Accuracy value={scoreboard.accuracy} />
        <Streak value={scoreboard.streak} />
      </div>
    </div>
  );
}

function Attempts({ value }: { value: number }) {
  return (
    <div>
      <span className="text-zinc-300 text-xl">
        🎯
        <span className="p-2 text-base font-bold font-mono">{value}</span>
      </span>
    </div>
  );
}

function Matches({ value }: { value: number }) {
  return (
    <div>
      <span className="text-zinc-300 text-xl">
        ✅<span className="p-2 text-base font-bold font-mono">{value}</span>
      </span>
    </div>
  );
}

function Accuracy({ value }: { value: number }) {
  return (
    <div>
      <span className="text-zinc-300 text-xl">
        📊<span className="p-2 text-base font-bold font-mono">{value}%</span>
      </span>
    </div>
  );
}

function Streak({ value }: { value: number }) {
  return (
    <div>
      <span className="text-zinc-300 text-xl">
        🔥<span className="p-2 text-base font-bold font-mono">{value}</span>
      </span>
    </div>
  );
}

import { ReactNode } from 'react';
import { TileScoreboard } from '../../types';
import Tooltip, { TooltipPosition } from '../ui/Tooltip';

export type GameStatsProps = {
  scoreboard: TileScoreboard;
};

export default function GameStats({ scoreboard }: GameStatsProps) {
  return (
    <div className="absolute top-0 w-full">
      <div
        className="
          mx-20 sm:mx-[25%] lg:mx-[35%] xl:mx-[35%]
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

type StatIndicatorProps = {
  name: string;
  children: ReactNode;
};

function StatIndicator({ name, children }: StatIndicatorProps) {
  return (
    <Tooltip position={TooltipPosition.Bottom} text={name}>
      {children}
    </Tooltip>
  );
}

function Attempts({ value }: { value: number }) {
  return (
    <StatIndicator name="Attempts">
      <span className="text-zinc-300 text-xl">
        🎯
        <span className="p-2 text-base font-bold ">{value}</span>
      </span>
    </StatIndicator>
  );
}

function Matches({ value }: { value: number }) {
  return (
    <StatIndicator name="Matches">
      <span className="text-zinc-300 text-xl">
        ✅<span className="p-2 text-base font-bold ">{value}</span>
      </span>
    </StatIndicator>
  );
}

function Accuracy({ value }: { value: number }) {
  return (
    <StatIndicator name="Accuracy">
      <span className="text-zinc-300 text-xl">
        📊<span className="p-2 text-base font-bold ">{value}%</span>
      </span>
    </StatIndicator>
  );
}

function Streak({ value }: { value: number }) {
  return (
    <StatIndicator name="Streak">
      <span className="text-zinc-300 text-xl">
        🔥<span className="p-2 text-base font-bold ">{value}</span>
      </span>
    </StatIndicator>
  );
}

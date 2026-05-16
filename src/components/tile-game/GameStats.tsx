import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { TileGameState, TileScoreboard } from '../../types';
import Tooltip, { TooltipPosition } from '../ui/Tooltip';

export type GameStatsProps = {
  scoreboard: TileScoreboard;
  elapsedTime: number;
};

export default function GameStats({ scoreboard, elapsedTime }: GameStatsProps) {
  return (
    <div className="absolute top-0 w-full">
      <div
        className="
          mx-16 sm:mx-[25%] lg:mx-[35%] xl:mx-[25%]
          px-6 py-4
          border-[1px] border-zinc-700 bg-zinc-800 rounded-b-md
        "
      >
        <div
          className="
          grid
          grid-cols-3 grid-rows-2
          sm:grid-cols-6 sm:grid-rows-1
          grid-flow-row sm:grid-flow-col
          justify-items-center
        "
        >
          <Attempts value={scoreboard.attempts} />
          <Matches value={scoreboard.matches} />
          <Accuracy value={scoreboard.accuracy} />
          <Streak value={scoreboard.streak} />
          <RemainingPairs value={scoreboard.remainingPairs} />
          <ElapsedTime value={elapsedTime} />
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
    <div style={{ justifySelf: 'normal' }} className="w-max">
      <Tooltip position={TooltipPosition.Bottom} text={name}>
        <div className="text-base sm:text-xl">{children}</div>
      </Tooltip>
    </div>
  );
}

function Attempts({ value }: { value: number }) {
  const { t } = useTranslation();
  return (
    <StatIndicator name={t('gameStats.attempts')}>
      <span className="text-zinc-300">
        🎯
        <span className="p-2 text-base font-bold ">{value}</span>
      </span>
    </StatIndicator>
  );
}

function Matches({ value }: { value: number }) {
  const { t } = useTranslation();
  return (
    <StatIndicator name={t('gameStats.matches')}>
      <span className="text-zinc-300">
        ✅<span className="p-2 text-base font-bold ">{value}</span>
      </span>
    </StatIndicator>
  );
}

function Accuracy({ value }: { value: number }) {
  const { t } = useTranslation();
  return (
    <StatIndicator name={t('gameStats.accuracy')}>
      <span className="text-zinc-300">
        📊<span className="p-2 text-base font-bold ">{value}%</span>
      </span>
    </StatIndicator>
  );
}

function Streak({ value }: { value: number }) {
  const { t } = useTranslation();
  return (
    <StatIndicator name={t('gameStats.streak')}>
      <span className="text-zinc-300">
        🔥<span className="p-2 text-base font-bold ">{value}</span>
      </span>
    </StatIndicator>
  );
}

function RemainingPairs({ value = 0 }: { value: number }) {
  const { t } = useTranslation();
  return (
    <StatIndicator name={t('gameStats.remaining')}>
      <span className="text-zinc-300">
        🎴<span className="p-2 text-base font-bold ">{value}</span>
      </span>
    </StatIndicator>
  );
}

function ElapsedTime({ value }: { value: TileGameState }) {
  const { t } = useTranslation();
  return (
    <StatIndicator name={t('gameStats.elapsedTime')}>
      <span className="text-zinc-300">
        ⏳<span className="p-2 text-base font-bold ">{value}</span>
      </span>
    </StatIndicator>
  );
}

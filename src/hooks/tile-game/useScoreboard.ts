import { useEffect, useState } from 'react';
import { TileAsset, TileScoreboard } from '../../types';
import { TileScoreboardI } from '../../interfaces';

export type TileScoreboardProps = {
  tiles: TileAsset[];
};

export const useScoreboard = (tileAssets: TileAsset[]): TileScoreboardI => {
  const [scoreboard, setScoreboard] = useState<TileScoreboard>({
    attempts: 0,
    matches: 0,
    accuracy: 0,
    streak: 0,
    remainingPairs: 0,
  });

  function onMatch() {
    const { attempts, matches, remainingPairs, streak } = scoreboard;

    setScoreboard({
      ...scoreboard,
      attempts: attempts + 1,
      matches: matches + 1,
      streak: streak + 1,
      accuracy: calculateAccuracy(attempts + 1, matches + 1),
      remainingPairs: remainingPairs - 1,
    });
  }

  function onMismatch() {
    const { attempts, matches } = scoreboard;
    setScoreboard({
      ...scoreboard,
      attempts: attempts + 1,
      streak: 0,
      accuracy: calculateAccuracy(attempts + 1, matches),
    });
  }

  function calculateAccuracy(attempts: number, matches: number) {
    if (attempts === 0) return 0;
    return +Math.round((matches / attempts) * 100).toFixed(2);
  }

  useEffect(() => {
    setScoreboard({ ...scoreboard, remainingPairs: tileAssets.length });
    // eslint-disable-next-line
  }, [tileAssets]);

  return {
    scoreboard,
    onMatch,
    onMismatch,
  };
};

import { useEffect, useState } from 'react';
import { TileScoreboard } from '../../types';
import { TileScoreboardI } from '../../interfaces';

export const useScoreboard = (): TileScoreboardI => {
  const [attempts, setAttempt] = useState<number>(0);
  const [matches, setMatch] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [scoreboard, setScoreboard] = useState<TileScoreboard>({
    attempts: 0,
    matches: 0,
    accuracy: 0,
    streak: 0
  });

  function onAttempt() {
    setAttempt(attempts + 1);
  }

  function onMatch() {
    setMatch(matches + 1);
    setStreak(streak + 1)
  }

  function onMismatch() {
    setStreak(0)
  }

  function calculateAccuracy(attempts: number, matches: number) {
    if (attempts === 0) return 0;
    return +Math.round((matches / attempts) * 100).toFixed(2);
  }

  useEffect(() => {
    const accuracy = calculateAccuracy(attempts, matches);
    setScoreboard({ ...scoreboard, attempts, accuracy });
    // eslint-disable-next-line
  }, [attempts]);

  useEffect(() => {
    const accuracy = calculateAccuracy(attempts, matches);
    setScoreboard({ ...scoreboard, matches, accuracy });
    // eslint-disable-next-line
  }, [matches]);

  useEffect(() => {
    setScoreboard({...scoreboard, streak})
    // eslint-disable-next-line
  }, [streak])

  return {
    scoreboard,
    onAttempt,
    onMatch,
    onMismatch
  };
};

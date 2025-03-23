import { useEffect } from 'react';
import { useTimer } from '../useTimer';
import { TileGameState } from '../../types';

export interface ElapsedTimeI {
  elapsedTime: number;
  isRunning: boolean;
}

export function useElapsedTime(gameState: TileGameState): ElapsedTimeI {
  const { elapsedTime, resume, pause, isRunning } = useTimer();

  useEffect(() => {
    switch (gameState) {
      case TileGameState.Idle:
        break;

      case TileGameState.Started:
        resume();
        break;

      case TileGameState.Paused:
        pause();
        break;

      case TileGameState.Finished:
        pause();
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  return { elapsedTime, isRunning };
}

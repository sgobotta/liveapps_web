import { useState } from 'react';
import { useInterval } from './useInterval';

export interface TimerI {
  elapsedTime: number;
  resume: () => void;
  pause: () => void;
  reset: () => void;
  stop: () => void;
  isRunning: boolean;
}

export function useTimer(): TimerI {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useInterval(
    () => {
      setElapsedTime((prev) => prev + 1);
    },
    isRunning ? 1000 : null,
  );

  function resume(): void {
    setIsRunning(true);
  }

  function pause(): void {
    setIsRunning(false);
  }

  function reset(): void {
    setElapsedTime(0);
    setIsRunning(true);
  }

  function stop(): void {
    setIsRunning(false);
  }

  return {
    elapsedTime,
    resume,
    pause,
    reset,
    stop,
    isRunning,
  };
}

import { useEffect, useRef, useState } from 'react';

type fun = () => void;

export function useInterval(callback: fun, delay: number | null): NodeJS.Timer {
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer | null>(null);
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }
    if (delay !== null) {
      const _intervalRef = setInterval(tick, delay);
      setIntervalRef(_intervalRef);
      return () => clearInterval(_intervalRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  return intervalRef!;
}

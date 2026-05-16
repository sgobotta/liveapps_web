import { useCallback, useEffect, useRef, useState } from 'react';

interface MouseWheelI {
  wheelDirection: number;
  wheelUpdated: boolean;
}

const EVENT = 'wheel';

export const useMouseWheel = (): MouseWheelI => {
  const [wheelDirection, setWheelDirection] = useState<number>(0);
  const [wheelUpdated, setForceUpdate] = useState(false);
  const rafRef = useRef<number | null>(null);

  function getDirectionByDeltaY(deltaY: number): number {
    return deltaY > 0 ? -1 : 1;
  }

  const handleWheel = useCallback((e: WheelEvent): void => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      setWheelDirection(getDirectionByDeltaY(e.deltaY));
      setForceUpdate((prev) => !prev);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener(EVENT, handleWheel);

    return () => {
      window.removeEventListener(EVENT, handleWheel);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [handleWheel]);

  return {
    wheelDirection,
    wheelUpdated,
  };
};

import { useCallback, useEffect, useState } from 'react';

interface MouseWheelI {
  wheelDirection: number;
  wheelUpdated: boolean;
}

const EVENT = 'wheel';

export const useMouseWheel = (): MouseWheelI => {
  const [wheelDirection, setWheelDirection] = useState<number>(0);
  const [wheelUpdated, setForceUpdate] = useState(false);

  function getDirectionByDeltaY(deltaY: number): number {
    return deltaY > 0 ? -1 : 1;
  }

  const handleWheel = useCallback((e: WheelEvent): void => {
    setWheelDirection(getDirectionByDeltaY(e.deltaY));
    setForceUpdate((prev) => !prev);
  }, []);

  useEffect(() => {
    window.addEventListener(EVENT, handleWheel);

    return () => {
      window.removeEventListener(EVENT, handleWheel);
    };
  }, [handleWheel]);

  return {
    wheelDirection,
    wheelUpdated,
  };
};

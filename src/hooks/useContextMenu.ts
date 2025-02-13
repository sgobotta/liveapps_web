import { useEffect } from 'react';

export const useContextMenuDisabled = (): void => {
  useEffect(() => {
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }, []);
};

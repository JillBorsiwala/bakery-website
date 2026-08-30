import { useEffect } from 'react';

export function useEscapeKey(handler, active = true) {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handler, active]);
}
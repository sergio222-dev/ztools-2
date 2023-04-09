import { MutableRefObject, useEffect } from 'react';

export const useOutsideClick = <T extends Element = Element>(
  reference: MutableRefObject<T | null>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      if (!reference.current) return;
      if (reference.current.contains(event.target as Node)) return;

      callback();
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [reference, callback]);
};

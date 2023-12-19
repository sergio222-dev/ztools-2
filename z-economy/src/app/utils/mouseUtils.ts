import { MutableRefObject, useEffect } from 'react';

export const useOutsideClick = <T extends HTMLDivElement = HTMLDivElement>(
  reference: MutableRefObject<T | undefined | null>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
      if (!event.target) return;
      if (!reference.current) return;
      if (reference.current.contains(event.target as Node)) return;
      if ('key' in event && event.type === 'keydown' && event.key !== 'Enter' && event.key !== 'Escape')
        return;

      callback();
    };

    // Bind the event listener
    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('keydown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('keydown', handleClickOutside);
    };
  }, [reference, callback]);
};

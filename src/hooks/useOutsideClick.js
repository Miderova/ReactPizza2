import { useEffect } from 'react';

export const useOutsideClick = (
  ref,
  handler,
  isListenerStopped = false
) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };
    
    if (!isListenerStopped) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler, ref, isListenerStopped]);
};

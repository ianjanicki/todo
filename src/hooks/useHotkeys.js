import hotkeys from 'hotkeys-js';
import { useCallback, useEffect } from 'react';

export function useHotkeys(keys, callback, deps = []) {
  const memoisedCallback = useCallback(callback, deps);

  useEffect(() => {
    // Enable hotkeys for INPUT/SELECT/TEXTAREA elements
    hotkeys.filter = () => {
      return true;
    };
    hotkeys(keys, memoisedCallback);

    return () => hotkeys.unbind(keys);
  }, [memoisedCallback, keys]);
}

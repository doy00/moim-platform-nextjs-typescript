'use client';

import { useCallback, useRef } from 'react';

export const getLocalStorageItem = (keyName: string) => {
  return window.localStorage.getItem(keyName);
};

export const setLocalStorageItem = (keyName: string, keyValue: string) => {
  window.localStorage.setItem(keyName, keyValue);
};

export const removeLocalStorageItem = (keyName: string) => {
  window.localStorage.removeItem(keyName);
};

type Debounce<T extends unknown[]> = (...args: T) => void;

export const useDebounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number,
): Debounce<T> => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: T) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay],
  );
};

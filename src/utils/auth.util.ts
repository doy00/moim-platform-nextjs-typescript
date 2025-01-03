'use client';

import { useCallback, useRef } from 'react';

export const setItemWithExpireTime = (keyName: string, keyValue: string, tts: number) => {
  const obj = {
    value: keyValue,
    expire: Date.now() + tts,
  };
  const objString = JSON.stringify(obj);
  window.localStorage.setItem(keyName, objString);
};

export const getItemWithExpireTime = (keyName: string): string | null => {
  const objString = window.localStorage.getItem(keyName);
  if (!objString) return null;
  const obj = JSON.parse(objString);
  if (Date.now() > obj.expire) {
    window.localStorage.removeItem(keyName);
    return null;
  }
  return obj.value;
};

export const removeItem = (keyName: string) => {
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

// Re-export everything from react
export * from 'react';
import * as React from 'react';
import { useCallback, useRef, useLayoutEffect } from 'react';

// Add useEffectEvent polyfill for React 19 compatibility
export function useEffectEvent<T extends (...args: any[]) => any>(
  callback: T
): T {
  const ref = useRef<T>(callback);

  useLayoutEffect(() => {
    ref.current = callback;
  });

  return useCallback((...args: any[]) => {
    const fn = ref.current;
    return fn(...args);
  }, []) as T;
}

export default React;

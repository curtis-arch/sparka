'use client';

// Polyfill for useEffectEvent which was removed from React 19
// react-data-grid still depends on this experimental API
import * as React from 'react';
import { useCallback, useRef, useLayoutEffect } from 'react';

declare module 'react' {
  export function useEffectEvent<T extends (...args: any[]) => any>(
    callback: T
  ): T;
}

// @ts-expect-error - Adding polyfill for removed React API
if (typeof React !== 'undefined' && !React.useEffectEvent) {
  // @ts-expect-error - Adding polyfill
  React.useEffectEvent = function useEffectEvent<T extends (...args: any[]) => any>(
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
  };
}

// Export empty component to make this a valid client component
export default function ReactPolyfills() {
  return null;
}

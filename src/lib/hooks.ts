import { DependencyList, RefObject, useEffect, useRef, useState } from 'react';

/**
 * Enable material icons
 */
export const useMaterialIcons = () => {
  useEffect(() => {
    const head = document.querySelector('head');
    if (head) {
      const existingMaterialIconsLink = head.querySelector(
        'link[href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"]',
      );
      if (!existingMaterialIconsLink) {
        const newMaterialIconsLink = document.createElement('link');
        newMaterialIconsLink.setAttribute(
          'href',
          'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp',
        );
        newMaterialIconsLink.setAttribute('rel', 'stylesheet');
        head.appendChild(newMaterialIconsLink);
      }
    }
  }, []);
};

/**
 * Fire a callback function when an event happens outside of a set of elements
 * @param eventType the event to listen to
 * @param callback the callback function to be fired
 * @param elementRefs an array of elements
 */
export const useEventOutside = (
  eventType: string,
  callback: () => void,
  elementRefs: RefObject<Element>[],
) => {
  const handler = (e: Event) => {
    let isOutside = true;
    for (const elementRef of elementRefs) {
      if (elementRef.current && elementRef.current.contains(e.target as Node)) {
        isOutside = false;
        return;
      }
    }
    if (isOutside) callback();
  };
  useEffect(() => {
    document.addEventListener(eventType, handler);
    return () => document.removeEventListener(eventType, handler);
  }, []);
};

/**
 * Listen to the resizing of an element
 * @returns Ref object of the element to listen to, width and height of the element
 */
export const useElementSize = <T extends Element>(): [
  elementRef: RefObject<T>,
  width: number,
  height: number,
] => {
  const elementRef = useRef<T | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(
      ([
        {
          target: { clientHeight, clientWidth },
        },
      ]) => {
        setWidth(clientWidth);
        setHeight(clientHeight);
      },
    );
    elementRef.current && resizeObserver.observe(elementRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return [elementRef, width, height];
};

/**
 * Get the debounced version of a function
 * @param callback the original function
 * @param delay the value of delay for the debounced function
 * @returns the debounced function
 */
export const useDebounce = (
  callback: (...args: unknown[]) => any,
  delay: number,
  dependencies?: DependencyList,
) => {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, dependencies);

  return (...args: unknown[]) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      callback.apply(null, args);
      timerRef.current = null;
    }, delay);
  };
};

/**
 * Get a throttled version of a function
 * @param {Function} callback the original function
 * @param {Number} limit time limit of the callback
 * @param {Array} dependencies dependencies of the throttled function
 * @returns the throttled version of the function
 */
export const useThrottle = (
  callback: (...args: unknown[]) => any,
  limit: number,
  dependencies?: DependencyList,
) => {
  const waiting = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      waiting.current = false;
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, dependencies);

  const throttledCallback = (...args: unknown[]) => {
    if (!waiting.current) {
      callback.call(null, ...args);
      waiting.current = true;
      timerRef.current = window.setTimeout(() => {
        waiting.current = false;
      }, limit);
    }
  };

  return throttledCallback;
};

/**
 * Set a clean up function for a component
 * @param cleanUp the clean up function
 */
export const useCleanUp = (cleanUp: () => void) => {
  useEffect(() => {
    return cleanUp;
  }, []);
}
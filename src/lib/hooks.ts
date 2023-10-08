import { RefObject, useEffect } from 'react';

export const useMaterialIcons = () => {
  useEffect(() => {
    const head = document.querySelector('head');
    if (head) {
      const existingMaterialIconsLink = head.querySelector(
        'link[href="https://fonts.googleapis.com/icon?family=Material+Icons"]',
      );
      if (!existingMaterialIconsLink) {
        const newMaterialIconsLink = document.createElement('link');
        newMaterialIconsLink.setAttribute(
          'href',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
        );
        newMaterialIconsLink.setAttribute('rel', 'stylesheet');
        head.appendChild(newMaterialIconsLink);
      }
    }
  }, []);
};

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

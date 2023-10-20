import { RefObject } from 'react';
import { StyleObject, StyleUpdater } from './types';

export const getUpdatedStyle = (baseStyle: StyleObject, styleUpdater?: StyleUpdater) =>
  styleUpdater ? styleUpdater(baseStyle) : baseStyle;

export const isFunction = (f: unknown): f is Function => typeof f === 'function';

export const getIconTipTopLeft = ({
  iconsContainerRef,
  iconContainerRef,
  iconTipRef,
}: {
  iconsContainerRef: RefObject<HTMLDivElement | null>;
  iconContainerRef: RefObject<HTMLDivElement | null>;
  iconTipRef: RefObject<HTMLDivElement | null>;
}): {
  top: number;
  left: number;
} => {
  if (!iconsContainerRef.current || !iconContainerRef.current || !iconTipRef.current)
    return { top: 0, left: 0 };
  const iconsContainerRect = iconsContainerRef.current?.getBoundingClientRect();
  const iconContainerRect = iconContainerRef.current?.getBoundingClientRect();
  const iconTipRect = iconTipRef.current?.getBoundingClientRect();
  let iconTipLeft = (iconContainerRect.width - iconTipRect.width) * 0.5;
  let iconTipTop = iconContainerRect.height + 2;
  if (iconContainerRect.left + iconTipLeft < iconsContainerRect.left + 2)
    iconTipLeft = iconsContainerRect.left + 2 - iconContainerRect.left;
  else if (
    iconContainerRect.left + iconTipLeft + iconTipRect.width + 2 >
    iconsContainerRect.left + iconsContainerRef.current?.clientWidth
  )
    iconTipLeft =
      iconsContainerRect.left +
      iconsContainerRef.current?.clientWidth -
      (iconContainerRect.left + iconTipRect.width + 2);
  if (
    iconContainerRect.top + iconTipTop + iconTipRect.height + 2 >
    iconsContainerRect.top + iconsContainerRect.height
  )
    iconTipTop = -1 * iconTipRect.height - 2;
  return { top: iconTipTop, left: iconTipLeft };
};

export const countNumberOfElementsInRow = (elements: NodeListOf<HTMLElement>): number => {
  if (elements.length === 0) return 0;

  // get the top position of the first element
  const firstElementTop = elements[0].getBoundingClientRect().top;

  // initialize a count for elements on the first row
  let count = 0;

  // iterate through the elements
  for (let i = 0; i < elements.length; i++) {
    // get the top position of the current element
    const currentElementTop = elements[i].getBoundingClientRect().top;

    // check if the current element is on the same row as the first element
    if (Math.abs(currentElementTop - firstElementTop) < 1) count++;
    else break;
  }

  return count;
};

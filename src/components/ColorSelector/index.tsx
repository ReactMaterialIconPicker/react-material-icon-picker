import React, { memo } from 'react';
import { ColorSelectorProps } from './types';
import { COLOR_SELECTOR_CONTAINER_BASE_STYLE } from '../../lib/styles';

export const ColorSelector = memo((props: ColorSelectorProps) => {
  const { styles } = props || {};
  const { colorSelectorContainer } = styles || {};

  return (
    <div
      style={
        colorSelectorContainer
          ? colorSelectorContainer(COLOR_SELECTOR_CONTAINER_BASE_STYLE)
          : COLOR_SELECTOR_CONTAINER_BASE_STYLE
      }
    ></div>
  );
});

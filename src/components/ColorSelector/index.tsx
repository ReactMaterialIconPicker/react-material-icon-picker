import { memo, useRef, useState } from 'react';
import { ColorSelectorProps } from './types';
import { hsvaToHex } from '@uiw/color-convert';
import {
  COLOR_SELECTED_INDICATOR_BASE_STYLE,
  COLOR_SELECTOR_CONTAINER_BASE_STYLE,
  COLOR_SELECTED_BASE_STYLE,
  COLOR_SELECTOR_ARROW_BASE_STYLE,
  PALETTE_CONTAINER_BASE_STYLE,
  SATURATION_BASE_STYLE,
  HUE_BASE_STYLE,
} from '../../lib/styles';
import ArrowDown from '../../assets/icons/arrowDown.svg';
import Hue from '@uiw/react-color-hue';
import Saturation from '@uiw/react-color-saturation';
import { useEventOutside } from '../../lib/hooks';
import { isFunction } from '../../lib/utils';

export const ColorSelector = memo((props: ColorSelectorProps) => {
  const { styles, setSelectedHsva, selectedHsva, hsva, onHsvaChange } = props || {};
  const {
    colorSelectorContainer,
    colorSelectedIndicator,
    colorSelected,
    colorSelectorArrow,
    paletteContainer,
    saturation,
    hue,
  } = styles || {};

  const [showPaletteContainer, setShowPaletteContainer] = useState<boolean>(false);
  const colorSelectorRef = useRef<HTMLDivElement | null>(null);
  const paletteRef = useRef<HTMLDivElement | null>(null);

  useEventOutside('mousedown', () => setShowPaletteContainer(false), [
    colorSelectorRef,
    paletteRef,
  ]);

  return (
    <div
      style={
        colorSelectorContainer
          ? colorSelectorContainer(COLOR_SELECTOR_CONTAINER_BASE_STYLE)
          : COLOR_SELECTOR_CONTAINER_BASE_STYLE
      }
      ref={colorSelectorRef}
      onClick={(e) =>
        !paletteRef.current?.contains(e.target as Node) &&
        setShowPaletteContainer(!showPaletteContainer)
      }
      data-testid="ip-colorSelectorContainer"
    >
      <svg
        style={
          colorSelectedIndicator
            ? colorSelectedIndicator(COLOR_SELECTED_INDICATOR_BASE_STYLE)
            : COLOR_SELECTED_INDICATOR_BASE_STYLE
        }
        data-testid="ip-colorSelectedIndicator"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="50" fill={hsvaToHex(hsva ?? selectedHsva)} />
      </svg>
      <span
        style={colorSelected ? colorSelected(COLOR_SELECTED_BASE_STYLE) : COLOR_SELECTED_BASE_STYLE}
        data-testid="ip-colorSelected"
      >
        {hsvaToHex(hsva ?? selectedHsva)}
      </span>
      <img
        src={ArrowDown}
        style={
          colorSelectorArrow
            ? colorSelectorArrow(COLOR_SELECTOR_ARROW_BASE_STYLE)
            : COLOR_SELECTOR_ARROW_BASE_STYLE
        }
        data-testid="ip-colorSelectorArrow"
      />
      {showPaletteContainer && (
        <div
          style={
            paletteContainer
              ? paletteContainer(PALETTE_CONTAINER_BASE_STYLE)
              : PALETTE_CONTAINER_BASE_STYLE
          }
          data-testid="ip-paletteContainer"
          ref={paletteRef}
        >
          <Saturation
            hsva={hsva ?? selectedHsva}
            style={saturation ? saturation(SATURATION_BASE_STYLE) : SATURATION_BASE_STYLE}
            onChange={(newColor: { h: number; s: number; v: number; a: number }) => {
              if (isFunction(onHsvaChange)) onHsvaChange(newColor);
              if (hsva === undefined) setSelectedHsva(newColor);
            }}
            data-testid="ip-paletteSaturation"
          />
          <Hue
            hue={hsva?.h ?? selectedHsva.h}
            style={hue ? hue(HUE_BASE_STYLE) : HUE_BASE_STYLE}
            onChange={(newHue: { h: number }) => {
              if (isFunction(onHsvaChange)) onHsvaChange({ ...(hsva ?? selectedHsva), ...newHue });
              if (hsva === undefined) setSelectedHsva({ ...(hsva ?? selectedHsva), ...newHue });
            }}
            data-testid="ip-paletteHue"
          />
        </div>
      )}
    </div>
  );
});

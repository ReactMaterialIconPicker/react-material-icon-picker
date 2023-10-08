import { StyleUpdater } from '../../lib/types';

interface IStyles {
  colorSelectorContainer?: StyleUpdater;
  colorSelectedIndicator?: StyleUpdater;
  colorSelected?: StyleUpdater;
  colorSelectorArrow?: StyleUpdater;
  paletteContainer?: StyleUpdater;
  saturation?: StyleUpdater;
  hue?: StyleUpdater;
}

export interface ColorSelectorProps {
  styles?: IStyles;
  hsva?: { h: number; s: number; v: number; a: number };
  setSelectedHsva: (hsva: { h: number; s: number; v: number; a: number }) => void;
  selectedHsva: { h: number; s: number; v: number; a: number };
  onHsvaChange?: (hsva: { h: number; s: number; v: number; a: number }) => void;
}

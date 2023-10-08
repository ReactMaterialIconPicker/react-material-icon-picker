import { StyleUpdater } from '../../lib/types';

interface IStyles {
  colorSelectorContainer?: StyleUpdater;
  colorSelectedIndicator?: StyleUpdater;
  colorSelected?: StyleUpdater;
  colorSelectorArrow?: StyleUpdater;
  palatteContainer?: StyleUpdater;
  saturation?: StyleUpdater;
  hue?: StyleUpdater;
}

export interface ColorSelectorProps {
  styles?: IStyles;
  hsva?: { h: number; s: number; v: number; a: number };
  setHsva?: (hsva: { h: number; s: number; v: number; a: number }) => void;
  onHsvaChange?: (hsva: { h: number; s: number; v: number; a: number }) => void;
  hsvaProp?: { h: number; s: number; v: number; a: number };
}

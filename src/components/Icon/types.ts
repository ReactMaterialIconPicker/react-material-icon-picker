import { StyleUpdater } from '../../lib/types';

interface IStyles {
  iconContainer?: StyleUpdater;
  icon?: StyleUpdater;
  iconTip?: StyleUpdater;
}

export interface IconProps {
  styles?: IStyles;
  icon: string;
  type: string;
  hsva: { h: number; s: number; v: number; a: number };
  onIconClick?: (icon: string) => void;
  onIconMouseEnter?: (icon: string) => void;
  setIconTipText?: (icon: string) => string;
}

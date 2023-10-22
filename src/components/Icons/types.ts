import { StyleUpdater } from '../../lib/types';

interface IStyles {
  iconsContainer?: StyleUpdater;
  iconContainer?: StyleUpdater;
  icon?: StyleUpdater;
  iconTip?: StyleUpdater;
  iconsContainerPlaceholder?: StyleUpdater;
  loadingContainer?: StyleUpdater;
  loading?: StyleUpdater;
}

export interface IconsProps {
  styles?: IStyles;
  iconSearch: string;
  type: string;
  hsva: { h: number; s: number; v: number; a: number };
  onIconsChange?: (icons: string[]) => void;
  onIconClick?: (icon: string) => void;
  onIconMouseEnter?: (icon: string) => void;
  showIconTip?: boolean;
  setIconTipText?: (icon: string) => string;
}

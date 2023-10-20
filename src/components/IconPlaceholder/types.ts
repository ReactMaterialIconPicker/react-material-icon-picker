import { StyleUpdater } from '../../lib/types';

interface IStyles {
  iconContainer?: StyleUpdater;
  icon?: StyleUpdater;
}

export interface IconProps {
  styles?: IStyles;
  minimizeHeight?: boolean;
}

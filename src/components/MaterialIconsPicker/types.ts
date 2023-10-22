import { Hsva, StyleUpdater, Type } from '../../lib/types';

interface IStyles {
  container?: StyleUpdater;
  searchContainer?: StyleUpdater;
  searchIcon?: StyleUpdater;
  searchInput?: StyleUpdater;
  optionContainer?: StyleUpdater;
  typeContainer?: StyleUpdater;
  typeSelected?: StyleUpdater;
  typeArrow?: StyleUpdater;
  typeOptionsContainer?: StyleUpdater;
  typeOption?: StyleUpdater;
  colorSelectorContainer?: StyleUpdater;
  colorSelectedIndicator?: StyleUpdater;
  colorSelected?: StyleUpdater;
  colorSelectorArrow?: StyleUpdater;
  paletteContainer?: StyleUpdater;
  saturation?: StyleUpdater;
  hue?: StyleUpdater;
  iconsContainer?: StyleUpdater;
  iconContainer?: StyleUpdater;
  icon?: StyleUpdater;
  iconTip?: StyleUpdater;
  loaderContainer?: StyleUpdater;
  loader?: StyleUpdater;
  iconsContainerPlaceholder?: StyleUpdater;
}

export interface MaterialIconsPickerProps {
  styles?: IStyles;
  defaultSearchValue?: string;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  searchBoxPlaceholder?: string;
  type?: Type;
  onTypeChange?: (type: Type) => void;
  hsva?: Hsva;
  onHsvaChange?: (hsva: Hsva) => void;
  onIconClick?: (icon: string) => void;
  onIconMouseEnter?: (icon: string) => void;
  setIconTipText?: (icon: string) => string;
  disableLoader?: boolean;
}

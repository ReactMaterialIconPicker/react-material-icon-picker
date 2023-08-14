import { StyleUpdater } from "../../lib/types";

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
    palatteContainer?: StyleUpdater;
    saturation?: StyleUpdater;
    hue?: StyleUpdater;
    iconsContainer?: StyleUpdater;
    iconContainer?: StyleUpdater;
    icon?: StyleUpdater;
    iconTip?: StyleUpdater;
    loadingContainer?: StyleUpdater;
    loading?: StyleUpdater;
    iconsContainerPlaceholder?: StyleUpdater;
}

export interface MaterialIconsPickerProps {
    styles?: IStyles;
    defaultSearchValue?: string;
    searchValue?: string;
    onSearchValueChange?: (value: string) => void;
    searchBoxPlaceholder?: string;
}
  
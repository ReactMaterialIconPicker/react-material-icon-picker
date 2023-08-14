import { StyleUpdater } from "../../lib/types";

interface IStyles {
    searchContainer?: StyleUpdater;
    searchIcon?: StyleUpdater;
    searchInput?: StyleUpdater;
}

export interface IconSearchProps {
    styles?: IStyles;
    setIconSearch: (iconSearch: string) => void;
    defaultSearchValue?: string;
    searchValue?: string;
    onSearchValueChange?: (value: string) => void;
    searchBoxPlaceholder?: string;
}
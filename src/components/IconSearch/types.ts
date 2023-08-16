import { Dispatch, SetStateAction } from 'react';
import { StyleUpdater } from '../../lib/types';

interface IStyles {
  searchContainer?: StyleUpdater;
  searchIcon?: StyleUpdater;
  searchInput?: StyleUpdater;
}

export interface IconSearchProps {
  styles?: IStyles;
  setIconSearch: Dispatch<SetStateAction<string>>;
  defaultSearchValue?: string;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  searchBoxPlaceholder?: string;
}

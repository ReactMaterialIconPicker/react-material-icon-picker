import { useRef, memo, KeyboardEvent, ChangeEvent } from 'react';
import { IconSearchProps } from './types';
import {
  SEARCH_CONTAINER_BASE_STYLE,
  SEARCH_ICON_BASE_STYLE,
  SEARCH_INPUT_BASE_STYLE,
} from '../../lib/styles';
import SearchIcon from '../../assets/icons/search.svg';
import { isFunction } from '../../lib/utils';

export const IconSearch = memo((props: IconSearchProps) => {
  const {
    styles,
    setIconSearch,
    defaultSearchValue,
    searchValue,
    onSearchValueChange,
    searchBoxPlaceholder,
  } = props || {};

  const { searchContainer, searchIcon, searchInput } = styles || {};

  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={
        searchContainer ? searchContainer(SEARCH_CONTAINER_BASE_STYLE) : SEARCH_CONTAINER_BASE_STYLE
      }
      data-testid="ip-searchContainer"
    >
      <img
        src={SearchIcon}
        style={searchIcon ? searchIcon(SEARCH_ICON_BASE_STYLE) : SEARCH_ICON_BASE_STYLE}
        onClick={() => setIconSearch(searchInputRef.current?.value || '')}
        data-testid="ip-searchIcon"
      />
      <input
        style={searchInput ? searchInput(SEARCH_INPUT_BASE_STYLE) : SEARCH_INPUT_BASE_STYLE}
        value={searchValue}
        defaultValue={defaultSearchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          isFunction(onSearchValueChange) && onSearchValueChange(e.target.value)
        }
        placeholder={searchBoxPlaceholder || 'Search'}
        ref={searchInputRef}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
          e.key === 'Enter' && setIconSearch(searchInputRef.current?.value || '')
        }
        data-testid="ip-searchInput"
      />
    </div>
  );
});

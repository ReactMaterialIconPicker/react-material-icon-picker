import { useRef, KeyboardEvent, ChangeEvent } from 'react';
import { IconSearchProps } from './types';
import {
  SEARCH_CONTAINER_BASE_STYLE,
  SEARCH_ICON_BASE_STYLE,
  SEARCH_INPUT_BASE_STYLE,
} from '../../lib/styles';
import SearchIcon from '../../assets/icons/search.svg';
import { isFunction } from '../../lib/utils';

export const IconSearch = (props: IconSearchProps) => {
  const {
    styles,
    setIconSearch,
    setSettledIconSearch,
    defaultSearchValue,
    searchValue,
    onSearchValueChange,
    onSearchValueSettled,
    searchBoxPlaceholder,
  } = props || {};

  const { searchContainer, searchIcon, searchInput } = styles || {};

  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchContainerStyle = isFunction(searchContainer)
    ? searchContainer(SEARCH_CONTAINER_BASE_STYLE)
    : SEARCH_CONTAINER_BASE_STYLE;
  const searchIconStyle = isFunction(searchIcon)
    ? searchIcon(SEARCH_ICON_BASE_STYLE)
    : SEARCH_ICON_BASE_STYLE;
  const searchInputStyle = isFunction(searchInput)
    ? searchInput(SEARCH_INPUT_BASE_STYLE)
    : SEARCH_INPUT_BASE_STYLE;

  return (
    <div
      style={searchContainerStyle}
      key={JSON.stringify(searchContainerStyle)}
      data-testid="ip-searchContainer"
    >
      <img
        src={SearchIcon}
        style={searchIconStyle}
        key={JSON.stringify(searchIconStyle)}
        onClick={() => {
          setIconSearch(searchInputRef.current?.value || '');
          setSettledIconSearch(searchInputRef.current?.value || '');
          isFunction(onSearchValueSettled) &&
            onSearchValueSettled(searchInputRef.current?.value || '');
        }}
        data-testid="ip-searchIcon"
      />
      <input
        style={searchInputStyle}
        key={JSON.stringify(searchInputStyle)}
        value={searchValue}
        defaultValue={defaultSearchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          isFunction(onSearchValueChange) && onSearchValueChange(e.target.value)
        }
        placeholder={searchBoxPlaceholder || 'Search'}
        ref={searchInputRef}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            setIconSearch(searchInputRef.current?.value || '');
            setSettledIconSearch(searchInputRef.current?.value || '');
            isFunction(onSearchValueSettled) &&
              onSearchValueSettled(searchInputRef.current?.value || '');
          }
        }}
        data-testid="ip-searchInput"
      />
    </div>
  );
};

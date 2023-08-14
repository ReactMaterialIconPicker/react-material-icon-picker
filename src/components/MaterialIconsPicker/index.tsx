import React, { memo, useState } from 'react';
import { CONTAINER_BASE_STYLE } from '../../lib/styles';
import { IconSearch } from '../IconSearch';
import { MaterialIconsPickerProps } from './types';

export const MaterialIconsPicker = memo((props: MaterialIconsPickerProps) => {
  const { styles, defaultSearchValue, searchValue, onSearchValueChange, searchBoxPlaceholder } =
    props || {};

  const { container } = styles || {};

  const [iconSearch, setIconSearch] = useState<string>('');

  console.log('MaterialIconsPicker render');

  return (
    <div style={container ? container(CONTAINER_BASE_STYLE) : CONTAINER_BASE_STYLE}>
      <IconSearch
        styles={styles}
        setIconSearch={setIconSearch}
        defaultSearchValue={defaultSearchValue}
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
        searchBoxPlaceholder={searchBoxPlaceholder}
      />
    </div>
  );
});

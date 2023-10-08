import { memo, useState } from 'react';
import { CONTAINER_BASE_STYLE, OPTION_CONTAINER_BASE_STYLE } from '../../lib/styles';
import { IconSearch } from '../IconSearch';
import { MaterialIconsPickerProps } from './types';
import { useMaterialIcons } from '../../lib/hooks';
import { Type } from '../../lib/types';
import { ICON_TYPES } from '../../lib/constants';
import { TypeSelector } from '../TypeSelector';
import { ColorSelector } from '../ColorSelector';

export const MaterialIconsPicker = memo((props: MaterialIconsPickerProps) => {
  const {
    styles,
    defaultSearchValue,
    searchValue,
    onSearchValueChange,
    searchBoxPlaceholder,
    type,
    onTypeChange,
  } = props || {};

  const { container, optionContainer } = styles || {};

  const [iconSearch, setIconSearch] = useState<string>('');
  const [selectedType, setSelectedType] = useState<Type>(ICON_TYPES[0]);

  useMaterialIcons();

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
      <div
        data-testid="mip-optionContainer"
        style={
          optionContainer
            ? optionContainer(OPTION_CONTAINER_BASE_STYLE)
            : OPTION_CONTAINER_BASE_STYLE
        }
      >
        <TypeSelector
          type={type}
          styles={styles}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          onTypeChange={onTypeChange}
        />
        <ColorSelector styles={styles} />
      </div>
    </div>
  );
});

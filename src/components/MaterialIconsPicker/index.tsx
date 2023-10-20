import { memo, useState } from 'react';
import { CONTAINER_BASE_STYLE, OPTION_CONTAINER_BASE_STYLE } from '../../lib/styles';
import { IconSearch } from '../IconSearch';
import { MaterialIconsPickerProps } from './types';
import { useMaterialIcons } from '../../lib/hooks';
import { Hsva, Type } from '../../lib/types';
import { ICON_TYPES } from '../../lib/constants';
import { TypeSelector } from '../TypeSelector';
import { ColorSelector } from '../ColorSelector';
import { Icons } from '../Icons';

export const MaterialIconsPicker = memo((props: MaterialIconsPickerProps) => {
  const {
    styles,
    defaultSearchValue,
    searchValue,
    onSearchValueChange,
    searchBoxPlaceholder,
    type,
    onTypeChange,
    hsva,
    onHsvaChange,
    onIconClick,
    onIconMouseEnter,
    setIconTipText,
  } = props || {};

  const { container, optionContainer } = styles || {};

  const [iconSearch, setIconSearch] = useState<string>('');
  const [selectedType, setSelectedType] = useState<Type>(ICON_TYPES[0]);
  const [selectedHsva, setSelectedHsva] = useState<Hsva>({ h: 0, s: 0, v: 0, a: 1 });

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
        <ColorSelector
          styles={styles}
          setSelectedHsva={setSelectedHsva}
          selectedHsva={selectedHsva}
          hsva={hsva}
          onHsvaChange={onHsvaChange}
        />
      </div>
      <Icons
        iconSearch={iconSearch}
        type={selectedType.value}
        hsva={selectedHsva}
        onIconClick={onIconClick}
        onIconMouseEnter={onIconMouseEnter}
        setIconTipText={setIconTipText}
      />
    </div>
  );
});

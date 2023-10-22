import { memo, useRef, useState } from 'react';
import { TypeSelectorProps } from './types';
import ArrowDown from '../../assets/icons/arrowDown.svg';
import {
  TYPE_CONTAINER_BASE_STYLE,
  TYPE_SELECTED_BASE_STYLE,
  TYPE_ARROW_BASE_STYLE,
  TYPE_OPTIONS_CONTAINER_BASE_STYLE,
  TYPE_OPTION_BASE_STYLE,
} from '../../lib/styles';
import { ICON_TYPES } from '../../lib/constants';
import { useEventOutside } from '../../lib/hooks';
import { isFunction } from '../../lib/utils';

export const TypeSelector = memo((props: TypeSelectorProps) => {
  const { styles, type, selectedType, setSelectedType, onTypeChange } = props || {};

  const { typeContainer, typeSelected, typeArrow, typeOptionsContainer, typeOption } = styles || {};

  const usedType = type || selectedType;
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const typeContainerRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  useEventOutside('mousedown', () => setShowOptions(false), [typeContainerRef, optionsRef]);

  return (
    <div
      style={typeContainer ? typeContainer(TYPE_CONTAINER_BASE_STYLE) : TYPE_CONTAINER_BASE_STYLE}
      onClick={() => setShowOptions(!showOptions)}
      ref={typeContainerRef}
      data-testid="ip-typeContainer"
    >
      <span
        style={typeSelected ? typeSelected(TYPE_SELECTED_BASE_STYLE) : TYPE_SELECTED_BASE_STYLE}
        data-testid="ip-typeLabel"
      >
        {usedType.label}
      </span>
      <img
        src={ArrowDown}
        style={typeArrow ? typeArrow(TYPE_ARROW_BASE_STYLE) : TYPE_ARROW_BASE_STYLE}
        data-testid="ip-typeArrow"
      />
      {showOptions && (
        <div
          style={
            typeOptionsContainer
              ? typeOptionsContainer(TYPE_OPTIONS_CONTAINER_BASE_STYLE)
              : TYPE_OPTIONS_CONTAINER_BASE_STYLE
          }
          ref={optionsRef}
          data-testid="ip-typeOptions"
        >
          {ICON_TYPES.map((option) => (
            <div
              style={typeOption ? typeOption(TYPE_OPTION_BASE_STYLE) : TYPE_OPTION_BASE_STYLE}
              onClick={() => {
                if (isFunction(onTypeChange)) onTypeChange(option);
                if (type === undefined) setSelectedType(option);
              }}
              data-testid="ip-typeOption"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

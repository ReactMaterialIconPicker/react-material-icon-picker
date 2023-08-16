import React, { memo } from 'react';
import { TypeSelectorProps } from './types';
import ArrowDown from '../../assets/icons/arrowDown.svg';
import { TYPE_CONTAINER_BASE_STYLE, TYPE_SELECTED_BASE_STYLE, TYPE_ARROW_BASE_STYLE } from '../../lib/styles';

export const TypeSelector = memo((props: TypeSelectorProps) => {
    const { styles = {}, type, selectedType, setSelectedType, onTypeChange, onTypeOptionClick } = props || {};

    const {
        typeContainer,
        typeSelected,
        typeArrow,
        typeOptionsContainer,
        typeOption
    } = styles;

    return <div
        style={typeContainer ? typeContainer(TYPE_CONTAINER_BASE_STYLE) : TYPE_CONTAINER_BASE_STYLE}
    >
        <span
            style={
                typeSelected
                    ? typeSelected(TYPE_SELECTED_BASE_STYLE)
                    : TYPE_SELECTED_BASE_STYLE
            }
        >
            {selectedType.label}
        </span>
        <img
                src={ArrowDown}
                style={
                    typeArrow
                        ? typeArrow(TYPE_ARROW_BASE_STYLE)
                        : TYPE_ARROW_BASE_STYLE
                }
            />
    </div>;
});
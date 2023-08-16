import { Dispatch, SetStateAction } from "react";
import { StyleUpdater, Type } from "../../lib/types";

interface IStyles {
    typeContainer?: StyleUpdater;
    typeSelected?: StyleUpdater;
    typeArrow?: StyleUpdater;
    typeOptionsContainer?: StyleUpdater;
    typeOption?: StyleUpdater;
}

export interface TypeSelectorProps {
    styles?: IStyles;
    type?: Type;
    selectedType: Type;
    setSelectedType: Dispatch<SetStateAction<Type>>;
    onTypeChange?: (type: Type) => void;
    onTypeOptionClick?: (type: Type) => void;
}
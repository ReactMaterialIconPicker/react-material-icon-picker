import React from "react";
import ArrowDown from '../../assets/icons/arrowDown.svg';
import styles from './index.module.css';

interface MaterialIconsPickerProps {
    test: string
}


export const MaterialIconsPicker = (prop: MaterialIconsPickerProps) => {
    return <div className={styles.container}>
        <ArrowDown />
        MaterialIconsPicker
    </div>
}
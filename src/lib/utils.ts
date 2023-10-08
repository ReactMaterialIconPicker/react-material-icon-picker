import { StyleObject, StyleUpdater } from './types';

export const getUpdatedStyle = (baseStyle: StyleObject, styleUpdater?: StyleUpdater) =>
  styleUpdater ? styleUpdater(baseStyle) : baseStyle;

export const isFunction = (f: unknown): f is Function => typeof f === 'function';

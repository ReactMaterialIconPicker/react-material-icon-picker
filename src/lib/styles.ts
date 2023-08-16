import { StyleObject } from './types';

export const CONTAINER_BASE_STYLE: StyleObject = {
  width: '100%',
  minWidth: '230px',
  height: '100%',
  boxShadow: 'rgba(0, 0, 0, 0.25) 1px 1px 7px 2px',
};

export const SEARCH_CONTAINER_BASE_STYLE: StyleObject = {
  width: '100%',
  height: '40px',
  borderBottom: '1px solid rgb(229, 229, 229)',
  boxSizing: 'border-box',
  padding: '11px 10px',
  display: 'flex',
  alignItems: 'center',
};

export const SEARCH_ICON_BASE_STYLE: StyleObject = {
  height: '100%',
  aspectRatio: '1 / 1',
  cursor: 'pointer',
  marginRight: '10px',
};

export const SEARCH_INPUT_BASE_STYLE: StyleObject = {
  flexGrow: '1',
  outline: 'none',
  border: '0px',
  fontSize: '12px',
  fontFamily: 'Arial, serif',
};

export const OPTION_CONTAINER_BASE_STYLE: StyleObject = {
  width: '100%',
  height: '40px',
  borderBottom: '1px solid rgb(229, 229, 229)',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
};

export const TYPE_CONTAINER_BASE_STYLE: StyleObject = {
  height: '100%',
  width: '0px',
  flexGrow: '1',
  borderRight: '1px solid #E5E5E5',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  padding: '11px 13px',
  cursor: 'pointer',
};

export const TYPE_SELECTED_BASE_STYLE: StyleObject = {
  fontFamily: 'Arial, serif',
  fontSize: '12px',
};

export const TYPE_ARROW_BASE_STYLE: StyleObject = {
  height: '50%',
  cursor: 'pointer',
  marginLeft: 'auto',
};
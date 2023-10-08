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

export const TYPE_OPTIONS_CONTAINER_BASE_STYLE: StyleObject = {
  position: 'absolute',
  zIndex: '10',
  top: '100%',
  left: '0px',
  border: '1px solid black',
  width: '100%',
  height: 'fit-content',
  backgroundColor: 'rgb(34, 34, 34)',
  boxShadow: 'rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  boxSizing: 'border-box',
};

export const TYPE_OPTION_BASE_STYLE: StyleObject = {
  width: '100%',
  height: '20px',
  margin: '5px 13px',
  fontFamily: 'Arial, serif',
  fontSize: '12px',
  cursor: 'pointer',
  color: 'rgb(253, 253, 253)',
  boxSizing: 'border-box',
};

export const COLOR_SELECTOR_CONTAINER_BASE_STYLE: StyleObject = {
  height: '100%',
  width: '0px',
  flexGrow: '1',
  boxSizing: 'border-box',
  padding: '11px 13px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

export const COLOR_SELECTED_INDICATOR_BASE_STYLE: StyleObject = {
  height: '100%',
  aspectRatio: '1/1',
};

export const COLOR_SELECTED_BASE_STYLE: StyleObject = {
  fontFamily: 'Arial serif',
  fontSize: '13px',
  marginLeft: '10px',
};

export const COLOR_SELECTOR_ARROW_BASE_STYLE: StyleObject = {
  height: '50%',
  marginLeft: 'auto',
};

export const PALETTE_CONTAINER_BASE_STYLE: StyleObject = {
  width: '100%',
  height: 'fit-content',
  position: 'absolute',
  zIndex: '10',
  top: '100%',
  right: '0px',
  boxSizing: 'border-box',
  padding: '15px',
  boxShadow: 'rgba(60, 64, 67, 0.15) 0px 2px 6px 0px',
  backgroundColor: 'rgb(255, 255, 255)',
};

export const SATURATION_BASE_STYLE: StyleObject = {
  width: '100%',
  aspectRatio: '1/1',
};

export const HUE_BASE_STYLE: StyleObject = {
  marginTop: '15px',
};

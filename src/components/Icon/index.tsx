import { ForwardedRef, RefObject, forwardRef, useRef, useState } from 'react';
import { ICON_TYPES } from '../../lib/constants';
import { getIconTipTopLeft, isFunction } from '../../lib/utils';
import { ICON_BASE_STYLE, ICON_CONTAINER_BASE_STYLE, ICON_TIP_BASE_STYLE } from '../../lib/styles';
import cssStyles from './styles.module.css';
import { IconProps } from './types';
import { hsvaToHex } from '@uiw/color-convert';

export const Icon = forwardRef(
  (props: IconProps, iconsContainerRef: ForwardedRef<HTMLDivElement | null>) => {
    const { styles, icon, type, hsva, onIconClick, onIconMouseEnter, setIconTipText } = props || {};

    const { iconContainer, icon: iconStyleUpdater, iconTip } = styles || {};

    const [showTip, setShowTip] = useState<boolean>(false);
    const iconContainerRef = useRef<HTMLDivElement | null>(null);
    const iconTipRef = useRef<HTMLDivElement | null>(null);

    const iconTipBaseStyle = ICON_TIP_BASE_STYLE({
      ...getIconTipTopLeft({
        iconsContainerRef: iconsContainerRef as RefObject<HTMLDivElement | null>,
        iconContainerRef,
        iconTipRef,
      }),
      visibility: showTip ? 'visible' : 'hidden',
    });
    const iconContainerStyle = isFunction(iconContainer)
      ? iconContainer(ICON_CONTAINER_BASE_STYLE)
      : ICON_CONTAINER_BASE_STYLE;
    const iconStyle = isFunction(iconStyleUpdater)
      ? iconStyleUpdater(ICON_BASE_STYLE({ hex: hsvaToHex(hsva) }))
      : ICON_BASE_STYLE({ hex: hsvaToHex(hsva) });
    const iconTipStyle = isFunction(iconTip) ? iconTip(iconTipBaseStyle) : iconTipBaseStyle;

    return (
      <div
        style={iconContainerStyle}
        key={JSON.stringify(iconContainerStyle) + icon}
        ref={iconContainerRef}
        className={cssStyles.iconContainer}
        onMouseEnter={() => {
          setShowTip(true);
          isFunction(onIconMouseEnter) && onIconMouseEnter(icon);
        }}
        onMouseLeave={() => setShowTip(false)}
        onClick={() => isFunction(onIconClick) && onIconClick(icon)}
        data-testid="ip-iconContainer"
      >
        <div
          className={`material-icons${type === ICON_TYPES[0].value ? '' : '-' + type}`}
          style={iconStyle}
          key={JSON.stringify(iconStyle)}
          data-testid="ip-icon"
        >
          {icon}
        </div>
        <div
          style={iconTipStyle}
          key={JSON.stringify(iconTipStyle)}
          ref={iconTipRef}
          data-testid="ip-iconTip"
        >
          {isFunction(setIconTipText) ? setIconTipText(icon) : icon}
        </div>
      </div>
    );
  },
);

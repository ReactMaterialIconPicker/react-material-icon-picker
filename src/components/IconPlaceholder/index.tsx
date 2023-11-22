import { ICON_BASE_STYLE, ICON_CONTAINER_BASE_STYLE } from '../../lib/styles';
import { IconProps } from './types';
import { MATERIAL_ICONS } from '../../assets/materialIcons';
import { isFunction } from '../../lib/utils';

export const IconPlaceholder = (props: IconProps) => {
  const { styles, minimizeHeight = false } = props || {};
  const { iconContainer, icon: iconStyleUpdater } = styles || {};

  const iconContainerStyle = isFunction(iconContainer)
    ? iconContainer(ICON_CONTAINER_BASE_STYLE)
    : ICON_CONTAINER_BASE_STYLE;
  const iconStyle = isFunction(iconStyleUpdater)
    ? iconStyleUpdater(ICON_BASE_STYLE({ hex: '#000000' }))
    : ICON_BASE_STYLE({ hex: '#000000' });

  return (
    <div
      style={{
        ...iconContainerStyle,
        visibility: 'hidden',
        ...(minimizeHeight && { height: '1px' }),
      }}
      key={JSON.stringify(iconContainerStyle)}
      data-testid="ip-iconPlaceholderContainer"
    >
      <div
        className={'material-icons'}
        style={iconStyle}
        key={JSON.stringify(iconStyle)}
        data-testid="ip-iconPlaceholder"
      >
        {MATERIAL_ICONS[0]}
      </div>
    </div>
  );
};

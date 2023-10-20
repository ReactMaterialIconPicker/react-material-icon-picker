import { ICON_BASE_STYLE, ICON_CONTAINER_BASE_STYLE } from '../../lib/styles';
import { IconProps } from './types';
import { MATERIAL_ICONS } from '../../assets/materialIcons';

export const IconPlaceholder = (props: IconProps) => {
  const { styles, minimizeHeight = false } = props || {};
  const { iconContainer, icon: iconStyle } = styles || {};
  const iconContainerStyle = iconContainer
    ? iconContainer(ICON_CONTAINER_BASE_STYLE)
    : ICON_CONTAINER_BASE_STYLE;

  return (
    <div
      style={{
        ...iconContainerStyle,
        visibility: 'hidden',
        ...(minimizeHeight && { height: '1px' }),
      }}
      data-testid="ip-iconPlaceholderContainer"
    >
      <div
        className={'material-icons'}
        style={
          iconStyle
            ? iconStyle(ICON_BASE_STYLE({ hex: '#000000' }))
            : ICON_BASE_STYLE({ hex: '#000000' })
        }
        data-testid='ip-iconPlaceholder'
      >
        {MATERIAL_ICONS[0]}
      </div>
    </div>
  );
};

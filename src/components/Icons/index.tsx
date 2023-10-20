import { MATERIAL_ICONS } from '../../assets/materialIcons';
import {} from '../../lib/constants';
import { ICONS_CONTAINER_BASE_STYLE } from '../../lib/styles';
import type { IconsProps } from './types';
import { useDebounce, useElementSize, useThrottle } from '../../lib/hooks';
import { useEffect, useRef, useState } from 'react';
import { countNumberOfElementsInRow, isFunction } from '../../lib/utils';
import { Icon } from '../Icon';
import { IconPlaceholder } from '../IconPlaceholder';

export const Icons = (props: IconsProps) => {
  const { styles, type, hsva, onIconClick, onIconMouseEnter, setIconTipText } = props || {};

  const { iconsContainer } = styles || {};

  const [iconPlaceholderState, setIconPlaceholderState] = useState(0);
  const [iconsContainerRef, iconsContainerWidth, iconsContainerHeight] =
    useElementSize<HTMLDivElement>();
  const iconContainerDimensionPxRef = useRef<Record<string, number>>({ width: 0, height: 0 });
  const iconNumbersRef = useRef<Record<string, number>>({ maxColumnCount: 0, maxRowCount: 0 });
  const initialRenderRef = useRef<boolean>(true);
  const updateIcons = useThrottle(() => setIconPlaceholderState(0), 1000);
  const deboucnedRerenderIcons = useDebounce(() => updateIcons(), 1000);

  const renderIcons = () => {
    if (iconPlaceholderState === 0) return <IconPlaceholder styles={styles} />;
    else if (iconPlaceholderState === 1) {
      return new Array(
        iconNumbersRef.current.maxColumnCount * iconNumbersRef.current.maxRowCount,
      ).fill(<IconPlaceholder styles={styles} />);
    } else if (iconPlaceholderState === 2) {
      return [
        ...MATERIAL_ICONS.slice(
          0,
          iconNumbersRef.current.actualColumnCount * iconNumbersRef.current.maxRowCount,
        ).map((icon) => (
          <Icon 
            icon={icon}
            type={type}
            hsva={hsva}
            ref={iconsContainerRef}
            styles={styles}
            onIconClick={onIconClick}
            onIconMouseEnter={onIconMouseEnter}
            setIconTipText={setIconTipText}
          />
        )),
        ...renderEndingIconPlaceholders(),
      ];
    }
  };

  const renderEndingIconPlaceholders = () => new Array(
    iconNumbersRef.current.actualColumnCount || iconNumbersRef.current.maxColumnCount || 10,
  ).fill(<IconPlaceholder minimizeHeight={true} />);

  useEffect(() => {
    if (iconPlaceholderState === 0) {
      const iconPlaceholderContainer = iconsContainerRef.current?.querySelector(
        '[data-testid=ip-iconPlaceholderContainer]',
      );
      const rect = iconPlaceholderContainer?.getBoundingClientRect();
      iconContainerDimensionPxRef.current = {
        width: rect?.width || 0,
        height: rect?.height || 0,
      };
      const iconsContainerWidth = (
        iconsContainerRef.current as HTMLDivElement
      ).getBoundingClientRect().width;
      iconNumbersRef.current.maxColumnCount = Math.ceil(
        iconsContainerWidth / iconContainerDimensionPxRef.current.width,
      );
      iconNumbersRef.current.maxRowCount = Math.ceil(
        (iconsContainerRef.current as HTMLDivElement).clientHeight /
          iconContainerDimensionPxRef.current.height,
      );
      setIconPlaceholderState(1);
    } else if (iconPlaceholderState === 1) {
      iconNumbersRef.current.actualColumnCount = countNumberOfElementsInRow(
        (iconsContainerRef.current as HTMLDivElement).querySelectorAll(
          '[data-testid=ip-iconPlaceholderContainer]',
        ),
      );
      setIconPlaceholderState(2);
    }
  }, [iconPlaceholderState]);

  useEffect(() => {
    if (initialRenderRef.current && iconsContainerWidth && iconsContainerHeight)
      initialRenderRef.current = false;
    else if (!initialRenderRef.current && iconsContainerWidth && iconsContainerHeight) {
      deboucnedRerenderIcons();
    }
  }, [iconsContainerWidth, iconsContainerHeight]);

  return (
    <div
      style={
        isFunction(iconsContainer)
          ? iconsContainer(ICONS_CONTAINER_BASE_STYLE)
          : ICONS_CONTAINER_BASE_STYLE
      }
      ref={iconsContainerRef}
      data-testid='ip-iconsContainer'
    >
      {renderIcons()}
    </div>
  );
};

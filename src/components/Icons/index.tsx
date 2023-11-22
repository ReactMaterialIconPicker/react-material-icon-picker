import { MATERIAL_ICONS } from '../../assets/materialIcons';
import LoaderIcon from '../../assets/icons/loading.svg';
import {
  ICONS_CONTAINER_BASE_STYLE,
  LOADER_BASE_STYLE,
  LOADER_CONTAINER_BASE_STYLE,
} from '../../lib/styles';
import type { IconsProps } from './types';
import {
  useCleanUp,
  useDebounce,
  useEffectUpdate,
  useElementSize,
  useThrottle,
} from '../../lib/hooks';
import { useEffect, useRef, useState } from 'react';
import {
  countNumberOfElementsInRow,
  isFunction,
  countNumberOfElementsInColumn,
  getContentWidth,
  getContentHeight,
} from '../../lib/utils';
import { Icon } from '../Icon';
import { IconPlaceholder } from '../IconPlaceholder';
import cssStyles from './index.module.css';
import { DEFAULT_ICONS_CONTAINER_HEIGHT } from '../../lib/constants';

export const Icons = (props: IconsProps) => {
  const {
    styles,
    type,
    hsva,
    onIconClick,
    onIconMouseEnter,
    setIconTipText,
    settledIconSearch,
    onIconsChange,
    onIconsScroll,
    disableLoader,
  } = props || {};

  const { iconsContainer, loaderContainer, loader } = styles || {};

  const [iconNumber, setIconNumber] = useState<number>(0);
  const [iconPlaceholderState, setIconPlaceholderState] = useState(0);
  const [useDefaultIconsContainerHeight, setUseDefaultIconsContainerHeight] = useState(false);
  const [loading, setLoading] = useState(false);
  const [iconsContainerRef, iconsContainerWidth, iconsContainerHeight] =
    useElementSize<HTMLDivElement>();
  const iconContainerDimensionPxRef = useRef<Record<string, number>>({ width: 0, height: 0 });
  const iconsContainerDimensionPxRef = useRef<Record<string, number>>({ width: 0, height: 0 });
  const iconNumbersRef = useRef<Record<string, number>>({
    maxColumnCount: 0,
    maxRowCount: 0,
    actualColumnCount: 0,
  });
  const initialRenderRef = useRef<boolean>(true);
  const loaderTimeoutRef = useRef<number>(0);
  const updateIcons = useThrottle(() => setIconPlaceholderState(0), 300);
  const deboucnedRerenderIcons = useDebounce(() => updateIcons(), 300);
  const iconSearchResults =
    String(settledIconSearch) !== ''
      ? MATERIAL_ICONS.filter((s) => s.toLowerCase().includes(settledIconSearch.toLowerCase()))
      : MATERIAL_ICONS;

  const iconsContainerStyle = isFunction(iconsContainer)
    ? iconsContainer(ICONS_CONTAINER_BASE_STYLE)
    : ICONS_CONTAINER_BASE_STYLE;
  const loaderContainerStyle = isFunction(loaderContainer)
    ? loaderContainer(LOADER_CONTAINER_BASE_STYLE)
    : LOADER_CONTAINER_BASE_STYLE;
  const loaderStyle = isFunction(loader) ? loader(LOADER_BASE_STYLE) : LOADER_BASE_STYLE;

  const renderIcons = () => {
    if (iconPlaceholderState === 0) return <></>;
    else if (iconPlaceholderState === 1) return <IconPlaceholder styles={styles} />;
    else if (iconPlaceholderState === 2) {
      return new Array(
        iconNumbersRef.current.maxColumnCount * iconNumbersRef.current.maxRowCount,
      ).fill(<IconPlaceholder styles={styles} />);
    } else if (iconPlaceholderState === 3) {
      return [
        ...iconSearchResults
          .slice(0, iconNumber)
          .map((icon) => (
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

  const renderEndingIconPlaceholders = () => {
    if (
      iconNumbersRef.current.actualColumnCount * iconNumbersRef.current.actualRowCount >
      iconNumber
    ) {
      return new Array(
        iconNumbersRef.current.actualColumnCount * iconNumbersRef.current.actualRowCount -
          iconNumber,
      ).fill(<IconPlaceholder styles={styles} />);
    } else if (iconNumber % iconNumbersRef.current.actualColumnCount !== 0) {
      return new Array(
        iconNumbersRef.current.actualColumnCount -
          (iconNumber % iconNumbersRef.current.actualColumnCount),
      ).fill(<IconPlaceholder styles={styles} />);
    }

    return [];
  };

  const onIconsContainerScroll = (event: React.SyntheticEvent) => {
    if (isFunction(onIconsScroll)) onIconsScroll(event);
    const eventTarget = event.target as HTMLDivElement;
    // scrolled to the bottom
    if (eventTarget.scrollTop + eventTarget.clientHeight >= eventTarget.scrollHeight) {
      if (disableLoader) {
        setIconNumber((num) =>
          Math.min(num + 3 * iconNumbersRef.current.actualColumnCount, iconSearchResults.length),
        );
      } else {
        setLoading(true);
      }
    }
  };

  useEffectUpdate(() => {
    setIconPlaceholderState(0);
  }, [settledIconSearch]);

  useEffect(() => {
    if (iconPlaceholderState === 0) {
      iconsContainerDimensionPxRef.current.width = getContentWidth(
        iconsContainerRef.current as HTMLDivElement,
      );
      iconsContainerDimensionPxRef.current.height = getContentHeight(
        iconsContainerRef.current as HTMLDivElement,
      );

      if (iconsContainerDimensionPxRef.current.height <= DEFAULT_ICONS_CONTAINER_HEIGHT) {
        setUseDefaultIconsContainerHeight(true);
        iconsContainerDimensionPxRef.current.height = 100;
      } else {
        setUseDefaultIconsContainerHeight(false);
      }

      setIconPlaceholderState(1);
    }
    if (iconPlaceholderState === 1) {
      const iconPlaceholderContainer = iconsContainerRef.current?.querySelector(
        '[data-testid=ip-iconPlaceholderContainer]',
      );
      const rect = iconPlaceholderContainer?.getBoundingClientRect();
      iconContainerDimensionPxRef.current = {
        width: rect?.width || 0,
        height: rect?.height || 0,
      };

      iconNumbersRef.current.maxColumnCount = Math.floor(
        iconsContainerDimensionPxRef.current.width / iconContainerDimensionPxRef.current.width,
      );
      iconNumbersRef.current.maxRowCount = Math.floor(
        iconsContainerDimensionPxRef.current.height / iconContainerDimensionPxRef.current.height,
      );

      setIconPlaceholderState(2);
    } else if (iconPlaceholderState === 2) {
      iconNumbersRef.current.actualColumnCount = countNumberOfElementsInRow(
        (iconsContainerRef.current as HTMLDivElement).querySelectorAll(
          '[data-testid=ip-iconPlaceholderContainer]',
        ),
      );
      iconNumbersRef.current.actualRowCount = countNumberOfElementsInColumn(
        iconsContainerRef.current as HTMLDivElement,
      );

      let initIconNumber =
        iconNumbersRef.current.actualColumnCount * iconNumbersRef.current.actualRowCount;
      if (iconSearchResults.length > initIconNumber)
        initIconNumber = Math.min(
          iconSearchResults.length,
          initIconNumber + iconNumbersRef.current.actualColumnCount * 2,
        );
      else if (iconSearchResults.length <= initIconNumber)
        initIconNumber = iconSearchResults.length;
      setIconNumber(initIconNumber);

      setIconPlaceholderState(3);
    }
  }, [iconPlaceholderState]);

  useEffect(() => {
    if (initialRenderRef.current && iconsContainerWidth !== 0 && iconsContainerHeight !== 0) {
      initialRenderRef.current = false;
    } else if (
      !initialRenderRef.current &&
      iconsContainerWidth !== 0 &&
      iconsContainerHeight !== 0
    ) {
      deboucnedRerenderIcons();
    }
  }, [iconsContainerWidth, iconsContainerHeight]);

  useEffect(() => {
    if (disableLoader) return;
    if (loading) {
      loaderTimeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setIconNumber((num) =>
          Math.min(num + 3 * iconNumbersRef.current.actualColumnCount, iconSearchResults.length),
        );
      }, 500);
    }
  }, [loading, disableLoader]);

  useEffect(() => {
    if (isFunction(onIconsChange)) onIconsChange(iconSearchResults.slice(0, iconNumber));
  }, [iconSearchResults, iconNumber]);

  useCleanUp(() => {
    clearTimeout(loaderTimeoutRef.current);
  });

  return (
    <div
      style={{
        ...iconsContainerStyle,
        ...(useDefaultIconsContainerHeight && {
          height: `${DEFAULT_ICONS_CONTAINER_HEIGHT}px`,
          minHeight: `${DEFAULT_ICONS_CONTAINER_HEIGHT}px`,
        }),
      }}
      key={JSON.stringify(iconsContainerStyle)}
      ref={iconsContainerRef}
      onScroll={onIconsContainerScroll}
      data-testid="ip-iconsContainer"
    >
      {renderIcons()}
      {loading && (
        <div
          style={loaderContainerStyle}
          key={JSON.stringify(loaderContainerStyle)}
          data-testid="ip-loaderContainer"
        >
          <img
            src={LoaderIcon}
            style={loaderStyle}
            key={JSON.stringify(loaderStyle)}
            data-testid="ip-loader"
            className={cssStyles['ip-rotate']}
          />
        </div>
      )}
    </div>
  );
};

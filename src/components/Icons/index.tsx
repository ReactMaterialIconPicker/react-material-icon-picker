import { MATERIAL_ICONS } from '../../assets/materialIcons';
import LoaderIcon from '../../assets/icons/loading.svg';
import {} from '../../lib/constants';
import { ICONS_CONTAINER_BASE_STYLE, LOADER_BASE_STYLE, LOADER_CONTAINER_BASE_STYLE } from '../../lib/styles';
import type { IconsProps } from './types';
import { useCleanUp, useDebounce, useElementSize, useThrottle } from '../../lib/hooks';
import { useEffect, useRef, useState } from 'react';
import type { UIEvent } from 'react';
import { countNumberOfElementsInRow, isFunction, countNumberOfElementsInColumn, getContentWidth, getContentHeight } from '../../lib/utils';
import { Icon } from '../Icon';
import { IconPlaceholder } from '../IconPlaceholder';
import cssStyles from './index.module.css';

export const Icons = (props: IconsProps) => {
  const { styles, type, hsva, onIconClick, onIconMouseEnter, setIconTipText, iconSearch, disableLoader } =
    props || {};

  const { iconsContainer, loaderContainer, loader } = styles || {};

  const [iconNumber, setIconNumber] = useState<number>(0);
  const [iconPlaceholderState, setIconPlaceholderState] = useState(0);
  const [loading, setLoading] = useState(false);
  const [iconsContainerRef, iconsContainerWidth, iconsContainerHeight] =
    useElementSize<HTMLDivElement>();
  const iconContainerDimensionPxRef = useRef<Record<string, number>>({ width: 0, height: 0 });
  const iconNumbersRef = useRef<Record<string, number>>({
    maxColumnCount: 0,
    maxRowCount: 0,
    actualColumnCount: 0,
  });
  const initialRenderRef = useRef<boolean>(true);
  const loaderTimeoutRef = useRef<number>(0);
  const updateIcons = useThrottle(() => setIconPlaceholderState(0), 1000);
  const deboucnedRerenderIcons = useDebounce(() => updateIcons(), 1000);
  const iconSearchResults = iconSearch
    ? MATERIAL_ICONS.filter((s) => s.toLowerCase().includes(iconSearch.toLowerCase()))
    : MATERIAL_ICONS;

  const renderIcons = () => {
    if (iconPlaceholderState === 0) return <IconPlaceholder styles={styles} />;
    else if (iconPlaceholderState === 1) {
      return new Array(
        iconNumbersRef.current.maxColumnCount * iconNumbersRef.current.maxRowCount,
      ).fill(<IconPlaceholder styles={styles} />);
    } else if (iconPlaceholderState === 2) {
      return [
        ...iconSearchResults
          .slice(
            0,
            iconNumber,
          )
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
    if(iconNumbersRef.current.actualColumnCount * iconNumbersRef.current.actualRowCount > iconNumber) {
      return new Array(iconNumbersRef.current.actualColumnCount * iconNumbersRef.current.actualRowCount - iconNumber).fill(<IconPlaceholder styles={styles}/>);
    }
    else if(iconNumber % iconNumbersRef.current.actualColumnCount !== 0) {
      return new Array(iconNumbersRef.current.actualColumnCount - iconNumber % iconNumbersRef.current.actualColumnCount).fill(<IconPlaceholder styles={styles}/>);
    }

    return [];
  };

  const onIconsContainerScroll = (event: UIEvent<HTMLDivElement>) => {
    const eventTarget = event.target as HTMLDivElement;
    // scrolled to the bottom
    if (eventTarget.scrollTop + eventTarget.clientHeight >= eventTarget.scrollHeight) {
      if(disableLoader) {
        setIconNumber((num) =>
          Math.min(num + 3 * iconNumbersRef.current.actualColumnCount, iconSearchResults.length),
        );
      }
      else {
        setLoading(true);
      }
    }
  };

  useEffect(() => {
    setIconPlaceholderState(0);
  }, [iconSearch]);

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

      const iconsContainerContentWidth = getContentWidth(iconsContainerRef.current as HTMLDivElement);
      const iconsContainerContentHeight = getContentHeight(iconsContainerRef.current as HTMLDivElement);

      iconNumbersRef.current.maxColumnCount = Math.floor(iconsContainerContentWidth / iconContainerDimensionPxRef.current.width);
      iconNumbersRef.current.maxRowCount = Math.floor(iconsContainerContentHeight / iconContainerDimensionPxRef.current.height);

      setIconPlaceholderState(1);
    } else if (iconPlaceholderState === 1) {
      iconNumbersRef.current.actualColumnCount = countNumberOfElementsInRow(
        (iconsContainerRef.current as HTMLDivElement).querySelectorAll(
          '[data-testid=ip-iconPlaceholderContainer]',
        ),
      );
      iconNumbersRef.current.actualRowCount = countNumberOfElementsInColumn(iconsContainerRef.current as HTMLDivElement);

      let initIconNumber = iconNumbersRef.current.actualColumnCount * iconNumbersRef.current.actualRowCount;
      if(iconSearchResults.length > initIconNumber) initIconNumber = Math.min(iconSearchResults.length, initIconNumber + iconNumbersRef.current.actualColumnCount);
      else if(iconSearchResults.length <= initIconNumber) initIconNumber = iconSearchResults.length;
      setIconNumber(initIconNumber);

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

  useEffect(() => {
    if(disableLoader) return;
    if(loading) {
      loaderTimeoutRef.current = setTimeout(() => {
        setLoading(false);
        setIconNumber((num) =>
          Math.min(num + 3 * iconNumbersRef.current.actualColumnCount, iconSearchResults.length),
        );
      }, 1000);
    }
  }, [loading, disableLoader]);

  useCleanUp(() => {
    clearTimeout(loaderTimeoutRef.current);
  });

  return (
    <div
      style={
        isFunction(iconsContainer)
          ? iconsContainer(ICONS_CONTAINER_BASE_STYLE)
          : ICONS_CONTAINER_BASE_STYLE
      }
      ref={iconsContainerRef}
      onScroll={onIconsContainerScroll}
      data-testid="ip-iconsContainer"
    >
      {renderIcons()}
      {loading && <div
        style={isFunction(loaderContainer) ? loaderContainer(LOADER_CONTAINER_BASE_STYLE) : LOADER_CONTAINER_BASE_STYLE}
        data-testid='ip-loaderContainer'
      >
        <img
          src={LoaderIcon}
          style={isFunction(loader) ? loader(LOADER_BASE_STYLE) : LOADER_BASE_STYLE}
          data-testid='ip-loader'
          className={cssStyles['ip-rotate']}
        />
      </div>}
    </div>
  );
};

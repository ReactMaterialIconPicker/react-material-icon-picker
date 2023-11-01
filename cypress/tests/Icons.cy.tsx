import { hsvaToHex } from '@uiw/color-convert';
import { Icons } from '../../src/components/Icons';
import { ICON_TYPES } from '../../src/lib/constants';
import {
  ICONS_CONTAINER_BASE_STYLE,
  ICON_BASE_STYLE,
  LOADER_BASE_STYLE,
  LOADER_CONTAINER_BASE_STYLE,
} from '../../src/lib/styles';
import { countNumberOfElementsInRow } from '../../src/lib/utils';
import { verifyComputedStyle } from '../lib/util';

describe('tests for Icons', () => {
  describe('all elements should be rendered correctly', () => {
    it('the container should be visible and loader should not', () => {
      cy.mount(
        <Icons type={ICON_TYPES[0].value} hsva={{ h: 0, s: 0, v: 0, a: 0 }} iconSearch={''} />,
      );
      cy.get('[data-testid=ip-iconsContainer]').should('be.visible');
      cy.get('[data-testid=ip-loaderContainer]').should('not.exist');
      cy.get('[data-testid=ip-loader]').should('not.exist');
    });

    it('loader should be visible for a period of time when scrolled to the bottom', () => {
      cy.mount(
        <Icons type={ICON_TYPES[0].value} hsva={{ h: 0, s: 0, v: 0, a: 0 }} iconSearch={''} />,
      );
      cy.get('[data-testid=ip-iconsContainer]').scrollTo('bottom');
      cy.get('[data-testid=ip-loaderContainer]').should('be.visible');
      cy.get('[data-testid=ip-loader]').should('be.visible');
      cy.wait(2000);
      cy.get('[data-testid=ip-loaderContainer]').should('not.exist');
      cy.get('[data-testid=ip-loader]').should('not.exist');
    });

    it('number of icons rendered should be divisible by the number of icons in a row under various width', () => {
      let width = 250;
      for (let widthIncre = 0; widthIncre < 100; widthIncre++) {
        width += 10;
        cy.viewport(width, 500);
        cy.mount(
          <Icons type={ICON_TYPES[0].value} hsva={{ h: 0, s: 0, v: 0, a: 0 }} iconSearch={''} />,
        );
        cy.get('[data-testid=ip-iconContainer]').then((elements) => {
          const actualColumnCount = countNumberOfElementsInRow(elements as any);
          expect(elements.length % actualColumnCount === 0);
        });
      }
    });

    it('number of icons should be updated after resize', () => {
      let originalIconNumber = 0;
      cy.viewport(400, 500);
      cy.mount(
        <Icons type={ICON_TYPES[0].value} hsva={{ h: 0, s: 0, v: 0, a: 0 }} iconSearch={''} />,
      );
      cy.get('[data-testid=ip-iconContainer]').then((elements) => {
        const actualColumnCount = countNumberOfElementsInRow(elements as any);
        expect(elements.length % actualColumnCount === 0);
        originalIconNumber = actualColumnCount;
      });
      cy.viewport(500, 500);
      cy.get('[data-testid=ip-iconContainer]').then((elements) => {
        const actualColumnCount = countNumberOfElementsInRow(elements as any);
        expect(elements.length % actualColumnCount === 0);
        expect(actualColumnCount !== originalIconNumber);
      });
    });

    it('the container should have the correct base style', () => {
      cy.mount(
        <Icons type={ICON_TYPES[0].value} hsva={{ h: 0, s: 0, v: 0, a: 0 }} iconSearch={''} />,
      );
      verifyComputedStyle('[data-testid=ip-iconsContainer]', ICONS_CONTAINER_BASE_STYLE);
      cy.get('[data-testid=ip-iconsContainer]').scrollTo('bottom');
      verifyComputedStyle('[data-testid=ip-loaderContainer]', LOADER_CONTAINER_BASE_STYLE);
      verifyComputedStyle('[data-testid=ip-loader]', LOADER_BASE_STYLE);
    });

    it('icon tip should be in the boundaries of icons container', () => {
      cy.mount(
        <Icons type={ICON_TYPES[0].value} hsva={{ h: 0, s: 0, v: 0, a: 0 }} iconSearch={''} />,
      );
      const containerRect = document
        .querySelector('[data-testid=ip-iconsContainer]')
        ?.getBoundingClientRect();
      if (containerRect) {
        cy.get('[data-testid=ip-iconTip]').each((element) => {
          const iconTipRect = element[0].getBoundingClientRect();
          expect(iconTipRect.left >= containerRect.left && iconTipRect.left <= containerRect.right);
          expect(
            iconTipRect.right >= containerRect.left && iconTipRect.right <= containerRect.right,
          );
          expect(iconTipRect.top >= containerRect.top && iconTipRect.top <= containerRect.bottom);
          expect(
            iconTipRect.bottom >= containerRect.top && iconTipRect.bottom <= containerRect.bottom,
          );
        });
      }
    });
  });

  describe('test props', () => {
    it('test styles -- iconsContainer', () => {
      cy.mount(
        <Icons
          type={ICON_TYPES[1].value}
          hsva={{ h: 0, s: 0, v: 0, a: 0 }}
          iconSearch={''}
          styles={{ iconsContainer: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}
        />,
      );
      verifyComputedStyle('[data-testid=ip-iconsContainer]', ICONS_CONTAINER_BASE_STYLE, {
        border: ['1px solid red'],
      });
    });

    it('test styles -- loaderContainer', () => {
      cy.mount(
        <Icons
          type={ICON_TYPES[1].value}
          hsva={{ h: 0, s: 0, v: 0, a: 0 }}
          iconSearch={''}
          styles={{ loaderContainer: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}
        />,
      );
      cy.get('[data-testid=ip-iconsContainer]').scrollTo('bottom');
      verifyComputedStyle('[data-testid=ip-loaderContainer]', LOADER_CONTAINER_BASE_STYLE, {
        border: ['1px solid red'],
      });
    });

    it('test styles -- loader', () => {
      cy.mount(
        <Icons
          type={ICON_TYPES[1].value}
          hsva={{ h: 0, s: 0, v: 0, a: 0 }}
          iconSearch={''}
          styles={{ loader: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}
        />,
      );
      cy.get('[data-testid=ip-iconsContainer]').scrollTo('bottom');
      verifyComputedStyle('[data-testid=ip-loader]', LOADER_BASE_STYLE, {
        border: ['1px solid red'],
      });
    });

    it('test type', () => {
      cy.mount(
        <Icons type={ICON_TYPES[1].value} hsva={{ h: 0, s: 0, v: 0, a: 0 }} iconSearch={''} />,
      );
      cy.get('[data-testid=ip-icon]').should('have.class', `material-icons-${ICON_TYPES[1].value}`);
    });

    it('test hsva', () => {
      cy.mount(
        <Icons type={ICON_TYPES[0].value} hsva={{ h: 1, s: 1, v: 1, a: 1 }} iconSearch={''} />,
      );
      verifyComputedStyle(
        '[data-testid=ip-icon]',
        ICON_BASE_STYLE({ hex: hsvaToHex({ h: 1, s: 1, v: 1, a: 1 }) }),
        {
          color: ['rgb(3, 3, 3)'],
        },
      );
    });

    it('test disableLoader -- loader should not exist when disableLoader is true', () => {
      cy.mount(
        <Icons
          type={ICON_TYPES[1].value}
          hsva={{ h: 0, s: 0, v: 0, a: 0 }}
          iconSearch={''}
          disableLoader
        />,
      );
      cy.get('[data-testid=ip-iconsContainer]').scrollTo('bottom');
      cy.get('[data-testid=ip-loaderContainer]').should('not.exist');
      cy.get('[data-testid=ip-loader]').should('not.exist');
    });

    it('test onIconsScroll -- onIconsScroll should be called when user scrolls icons container', () => {
      cy.mount(
        <Icons
          type={ICON_TYPES[1].value}
          hsva={{ h: 0, s: 0, v: 0, a: 0 }}
          iconSearch={''}
          onIconsScroll={cy.stub().as('mockedOnIconsScroll')}
        />,
      );
      cy.get('[data-testid=ip-iconsContainer]').scrollTo('bottom');
      cy.get('@mockedOnIconsScroll').should('have.been.called');
    });

    it('test iconSearch -- iconSearch should change icon number', () => {
      cy.mount(
        <Icons
          type={ICON_TYPES[1].value}
          hsva={{ h: 0, s: 0, v: 0, a: 0 }}
          iconSearch={'impossibleIconSearchValue'}
        />,
      );
      cy.get('[data-testid=ip-iconContainer]').should('not.exist');
    });
  });
});

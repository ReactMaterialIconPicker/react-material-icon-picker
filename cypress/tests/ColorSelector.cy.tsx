import { hsvaToHex } from '@uiw/color-convert';
import { ColorSelector } from '../../src/components/ColorSelector';
import {
  COLOR_SELECTED_BASE_STYLE,
  COLOR_SELECTED_INDICATOR_BASE_STYLE,
  COLOR_SELECTOR_ARROW_BASE_STYLE,
  COLOR_SELECTOR_CONTAINER_BASE_STYLE,
  HUE_BASE_STYLE,
  PALETTE_CONTAINER_BASE_STYLE,
  SATURATION_BASE_STYLE,
} from '../../src/lib/styles';
import { verifyComputedStyle } from '../lib/util';
import { MaterialIconsPicker } from '../../src';

describe('tests for ColorSelector', () => {
  describe('test renders and interactions', () => {
    it('all elements should be visible except paletteContainer', () => {
      cy.mount(
        <ColorSelector selectedHsva={{ h: 0, s: 0, v: 0, a: 0 }} setSelectedHsva={cy.stub()} />,
      );
      cy.get('[data-testid=ip-colorSelectorContainer]').should('be.visible');
      cy.get('[data-testid=ip-colorSelectedIndicator]').should('be.visible');
      cy.get('[data-testid=ip-colorSelected]').should('be.visible');
      cy.get('[data-testid=ip-colorSelected]').should(
        'have.text',
        hsvaToHex({ h: 0, s: 0, v: 0, a: 0 }),
      );
      cy.get('[data-testid=ip-colorSelectorArrow]').should('be.visible');
      cy.get('[data-testid=ip-paletteContainer]').should('not.exist');
      cy.get('[data-testid=ip-paletteSaturation]').should('not.exist');
      cy.get('[data-testid=ip-paletteHue]').should('not.exist');
    });

    it('paletteContainer should be visible after clicking colorSelectorContainer', () => {
      cy.mount(
        <ColorSelector selectedHsva={{ h: 0, s: 0, v: 0, a: 0 }} setSelectedHsva={cy.stub()} />,
      );
      cy.get('[data-testid=ip-paletteContainer]').should('not.exist');
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      cy.get('[data-testid=ip-paletteContainer]').should('be.visible');
      cy.get('[data-testid=ip-paletteSaturation]').should('exist');
      cy.get('[data-testid=ip-paletteHue]').should('exist');
    });

    it('visible paletteContainer should be hidden after clicking colorSelectorContainer', () => {
      cy.mount(
        <ColorSelector selectedHsva={{ h: 0, s: 0, v: 0, a: 0 }} setSelectedHsva={cy.stub()} />,
      );
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      cy.get('[data-testid=ip-paletteContainer]').should('be.visible');
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      cy.get('[data-testid=ip-paletteContainer]').should('not.exist');
    });

    it('visible paletteContainer should be hidden after clicking anywhere else', () => {
      cy.mount(
        <ColorSelector selectedHsva={{ h: 0, s: 0, v: 0, a: 0 }} setSelectedHsva={cy.stub()} />,
      );
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      cy.get('[data-testid=ip-paletteContainer]').should('be.visible');
      cy.get('body').click();
      cy.get('[data-testid=ip-paletteContainer]').should('not.exist');
    });

    it('visible paletteContainer should not be hidden after clicking the palette', () => {
      cy.mount(<MaterialIconsPicker />);
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      cy.get('[data-testid=ip-paletteContainer]').should('be.visible');
      cy.get('[data-testid=ip-paletteSaturation').click();
      cy.get('[data-testid=ip-paletteHue').click();
      cy.get('[data-testid=ip-paletteContainer]').should('be.visible');
    });

    it('clicking paletteSaturation should change hsva', () => {
      cy.mount(<MaterialIconsPicker />);
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      cy.get('[data-testid=ip-paletteSaturation]').click(10, 10);
      cy.get('[data-testid=ip-colorSelected]').should(
        'not.have.text',
        hsvaToHex({ h: 0, s: 0, v: 0, a: 0 }),
      );
    });
  });

  describe('elements should have correct styles', () => {
    it('all elements should have the expected default styles', () => {
      cy.mount(<MaterialIconsPicker />);
      verifyComputedStyle(
        '[data-testid=ip-colorSelectorContainer]',
        COLOR_SELECTOR_CONTAINER_BASE_STYLE,
      );
      verifyComputedStyle(
        '[data-testid=ip-colorSelectedIndicator]',
        COLOR_SELECTED_INDICATOR_BASE_STYLE,
        {
          aspectRatio: ['1 / 1'],
        },
      );
      verifyComputedStyle('[data-testid=ip-colorSelected]', COLOR_SELECTED_BASE_STYLE, {
        fontFamily: ['"Arial serif"'],
      });
      verifyComputedStyle('[data-testid=ip-colorSelectorArrow]', COLOR_SELECTOR_ARROW_BASE_STYLE);
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      verifyComputedStyle('[data-testid=ip-paletteContainer]', PALETTE_CONTAINER_BASE_STYLE);
      verifyComputedStyle('[data-testid=ip-paletteSaturation]', SATURATION_BASE_STYLE, {
        aspectRatio: ['1 / 1'],
      });
      verifyComputedStyle('[data-testid=ip-paletteHue]', HUE_BASE_STYLE, {
        aspectRatio: ['1 / 1'],
      });
    });
  });

  describe('test props', () => {
    it('test styles colorSelectorContainer', () => {
      cy.mount(
        <MaterialIconsPicker
          styles={{
            colorSelectorContainer: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }),
          }}
        />,
      );
      verifyComputedStyle('[data-testid=ip-colorSelectorContainer]', {
        ...COLOR_SELECTOR_CONTAINER_BASE_STYLE,
        border: '1px solid red',
      });
    });

    it('test styles colorSelectedIndicator', () => {
      cy.mount(
        <MaterialIconsPicker
          styles={{
            colorSelectedIndicator: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }),
          }}
        />,
      );
      verifyComputedStyle(
        '[data-testid=ip-colorSelectedIndicator]',
        {
          ...COLOR_SELECTED_INDICATOR_BASE_STYLE,
          border: '1px solid red',
        },
        { aspectRatio: ['1 / 1'] },
      );
    });

    it('test styles colorSelected', () => {
      cy.mount(
        <MaterialIconsPicker
          styles={{ colorSelected: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}
        />,
      );
      verifyComputedStyle(
        '[data-testid=ip-colorSelected]',
        {
          ...COLOR_SELECTED_BASE_STYLE,
          border: '1px solid red',
        },
        { fontFamily: ['"Arial serif"'] },
      );
    });

    it('test styles colorSelectorArrow', () => {
      cy.mount(
        <MaterialIconsPicker
          styles={{
            colorSelectorArrow: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }),
          }}
        />,
      );
      verifyComputedStyle(
        '[data-testid=ip-colorSelectorArrow]',
        {
          ...COLOR_SELECTOR_ARROW_BASE_STYLE,
          border: '1px solid red',
        },
        { fontFamily: ['"Arial serif"'] },
      );
    });

    it('test styles paletteContainer', () => {
      cy.mount(
        <MaterialIconsPicker
          styles={{ paletteContainer: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}
        />,
      );
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      verifyComputedStyle('[data-testid=ip-paletteContainer]', {
        ...PALETTE_CONTAINER_BASE_STYLE,
        border: '1px solid red',
      });
    });

    it('test styles saturation', () => {
      cy.mount(
        <MaterialIconsPicker
          styles={{ saturation: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}
        />,
      );
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      verifyComputedStyle(
        '[data-testid=ip-paletteSaturation]',
        {
          ...SATURATION_BASE_STYLE,
          border: '1px solid red',
        },
        { aspectRatio: ['1 / 1'] },
      );
    });

    it('test styles hue', () => {
      cy.mount(
        <MaterialIconsPicker
          styles={{ hue: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}
        />,
      );
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      verifyComputedStyle(
        '[data-testid=ip-paletteHue]',
        {
          ...HUE_BASE_STYLE,
          border: '1px solid red',
        },
        { aspectRatio: ['1 / 1'] },
      );
    });

    it('test hsva -- hsva should override selectedHsva', () => {
      cy.mount(
        <ColorSelector
          selectedHsva={{ h: 0, s: 0, v: 0, a: 0 }}
          setSelectedHsva={cy.stub()}
          hsva={{ h: 0, s: 0, v: 0, a: 1 }}
        />,
      );
      cy.get('[data-testid=ip-colorSelected]').should(
        'have.text',
        hsvaToHex({ h: 0, s: 0, v: 0, a: 1 }),
      );
    });

    it('test hsva -- hsva should disable changing hsva', () => {
      cy.mount(<MaterialIconsPicker hsva={{ h: 1, s: 1, v: 1, a: 1 }} />);
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      cy.get('[data-testid=ip-paletteSaturation]').click(10, 10);
      cy.get('[data-testid=ip-colorSelected]').should(
        'have.text',
        hsvaToHex({ h: 1, s: 1, v: 1, a: 1 }),
      );
    });

    it('test onHsvaChange -- onHsvaChange should be invoked when hsva is changed', () => {
      cy.mount(<MaterialIconsPicker onHsvaChange={cy.stub().as('mockedOnHsvaChange')} />);
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      cy.get('[data-testid=ip-paletteSaturation]').click(10, 10);
      cy.get('@mockedOnHsvaChange').should('have.been.calledOnce');
    });

    it('test onHsvaChange -- onHsvaChange should be invoked even when hsva is present', () => {
      cy.mount(
        <MaterialIconsPicker
          onHsvaChange={cy.stub().as('mockedOnHsvaChange')}
          hsva={{ h: 1, s: 1, v: 1, a: 1 }}
        />,
      );
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      cy.get('[data-testid=ip-paletteSaturation]').click(10, 10);
      cy.get('@mockedOnHsvaChange').should('have.been.calledOnce');
    });
  });
});

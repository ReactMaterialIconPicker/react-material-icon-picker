import { TypeSelector } from '../../src/components/TypeSelector';
import { ICON_TYPES } from '../../src/lib/constants';
import {
  TYPE_ARROW_BASE_STYLE,
  TYPE_CONTAINER_BASE_STYLE,
  TYPE_OPTIONS_CONTAINER_BASE_STYLE,
  TYPE_OPTION_BASE_STYLE,
  TYPE_SELECTED_BASE_STYLE,
} from '../../src/lib/styles';
import { verifyComputedStyle } from '../lib/util';

describe('tests for TypeSelector', () => {
  describe('test renders and interactions', () => {
    it('all elements except options container should be visible', () => {
      cy.mount(<TypeSelector selectedType={ICON_TYPES[0]} setSelectedType={cy.stub()} />);
      cy.get('[data-testid=ip-typeContainer]').should('be.visible');
      cy.get('[data-testid=ip-typeLabel]').should('be.visible');
      cy.get('[data-testid=ip-typeLabel]').should('have.text', ICON_TYPES[0].label);
      cy.get('[data-testid=ip-typeArrow]').should('be.visible');
      cy.get('[data-testid=ip-typeOptions]').should('not.exist');
      cy.get('[data-testid=ip-typeOption]').should('not.exist');
    });

    it('options container should be visible when type container is clicked', () => {
      cy.mount(<TypeSelector selectedType={ICON_TYPES[0]} setSelectedType={cy.stub()} />);
      cy.get('[data-testid=ip-typeContainer]').click();
      cy.get('[data-testid=ip-typeOptions]').should('be.visible');
      cy.get('[data-testid=ip-typeOption]').should('be.visible');
      cy.get('[data-testid=ip-typeOption]').its('length').should('eq', ICON_TYPES.length);
    });

    it('visible options container should be hidden when a mousedown event happens', () => {
      cy.mount(<TypeSelector selectedType={ICON_TYPES[0]} setSelectedType={cy.stub()} />);
      cy.get('[data-testid=ip-typeContainer]').click();
      cy.get('[data-testid=ip-typeOptions]').should('be.visible');
      cy.get('[data-testid=ip-typeOption]').should('be.visible');
      cy.get('body').click();
      cy.get('[data-testid=ip-typeOptions]').should('not.exist');
      cy.get('[data-testid=ip-typeOption]').should('not.exist');
    });

    it('setSelectedType should be called after a type option is clicked', () => {
      cy.mount(
        <TypeSelector
          selectedType={ICON_TYPES[0]}
          setSelectedType={cy.stub().as('mockedSetSelectedType')}
        />,
      );
      cy.get('[data-testid=ip-typeContainer]').click();
      cy.get('[data-testid=ip-typeOption]').eq(1).click();
      cy.get('@mockedSetSelectedType').should('have.been.calledOnceWith', ICON_TYPES[1]);
    });
  });

  describe('elements should have correct styles', () => {
    it('all elements should have the expected default styles', () => {
      cy.mount(<TypeSelector selectedType={ICON_TYPES[0]} setSelectedType={cy.stub()} />);
      verifyComputedStyle('[data-testid=ip-typeContainer]', TYPE_CONTAINER_BASE_STYLE, {
        borderRight: ['1px solid rgb(229, 229, 229)'],
      });
      verifyComputedStyle('[data-testid=ip-typeLabel]', TYPE_SELECTED_BASE_STYLE);
      verifyComputedStyle('[data-testid=ip-typeArrow]', TYPE_ARROW_BASE_STYLE);
      verifyComputedStyle('[data-testid=ip-typeArrow]', TYPE_ARROW_BASE_STYLE);
      cy.get('[data-testid=ip-typeContainer]').click();
      verifyComputedStyle('[data-testid=ip-typeOptions]', TYPE_OPTIONS_CONTAINER_BASE_STYLE);
      verifyComputedStyle('[data-testid=ip-typeOption]', TYPE_OPTION_BASE_STYLE);
    });
  });

  describe('test props', () => {
    it('test styles typeContainer', () => {
      cy.mount(
        <TypeSelector
          selectedType={ICON_TYPES[0]}
          setSelectedType={cy.stub()}
          styles={{
            typeContainer: (baseStyle) => ({
              ...baseStyle,
              border: '1px solid red',
            }),
          }}
        />,
      );
      verifyComputedStyle('[data-testid=ip-typeContainer]', TYPE_CONTAINER_BASE_STYLE, {
        borderRight: ['1px solid red'],
      });
    });

    it('test styles typeSelected', () => {
      cy.mount(
        <TypeSelector
          selectedType={ICON_TYPES[0]}
          setSelectedType={cy.stub()}
          styles={{
            typeSelected: (baseStyle) => ({
              ...baseStyle,
              border: '1px solid red',
            }),
          }}
        />,
      );
      verifyComputedStyle('[data-testid=ip-typeLabel]', TYPE_SELECTED_BASE_STYLE, {
        border: ['1px solid red'],
      });
    });

    it('test styles typeArrow', () => {
      cy.mount(
        <TypeSelector
          selectedType={ICON_TYPES[0]}
          setSelectedType={cy.stub()}
          styles={{
            typeArrow: (baseStyle) => ({
              ...baseStyle,
              border: '1px solid red',
            }),
          }}
        />,
      );
      verifyComputedStyle('[data-testid=ip-typeArrow]', TYPE_ARROW_BASE_STYLE, {
        border: ['1px solid red'],
      });
    });

    it('test styles typeOptionsContainer', () => {
      cy.mount(
        <TypeSelector
          selectedType={ICON_TYPES[0]}
          setSelectedType={cy.stub()}
          styles={{
            typeOptionsContainer: (baseStyle) => ({
              ...baseStyle,
              border: '1px solid red',
            }),
          }}
        />,
      );
      cy.get('[data-testid=ip-typeContainer]')
        .click()
        .then(() =>
          verifyComputedStyle('[data-testid=ip-typeOptions]', TYPE_OPTIONS_CONTAINER_BASE_STYLE, {
            border: ['1px solid red'],
          }),
        );
    });

    it('test styles typeOption', () => {
      cy.mount(
        <TypeSelector
          selectedType={ICON_TYPES[0]}
          setSelectedType={cy.stub()}
          styles={{
            typeOption: (baseStyle) => ({
              ...baseStyle,
              border: '1px solid red',
            }),
          }}
        />,
      );
      cy.get('[data-testid=ip-typeContainer]').click();
      verifyComputedStyle('[data-testid=ip-typeOption]', TYPE_OPTION_BASE_STYLE, {
        border: ['1px solid red'],
      });
    });

    it('test type -- type should override selectedType and setSelectedType', () => {
      cy.mount(
        <TypeSelector
          selectedType={ICON_TYPES[0]}
          setSelectedType={cy.stub().as('mockedSetSelectedType')}
          type={ICON_TYPES[1]}
        />,
      );
      cy.get('[data-testid=ip-typeLabel]').should('have.text', ICON_TYPES[1].label);
      cy.get('[data-testid=ip-typeContainer]').click();
      cy.get('[data-testid=ip-typeOption]').eq(1).click();
      cy.get('@mockedSetSelectedType').should('not.have.been.called');
    });

    it('test onTypeChange -- onTypeChange should fire when a type option is clicked', () => {
      cy.mount(
        <TypeSelector
          selectedType={ICON_TYPES[0]}
          setSelectedType={cy.stub()}
          onTypeChange={cy.stub().as('mockedOnTypeChange')}
        />,
      );
      cy.get('[data-testid=ip-typeContainer]').click();
      cy.get('[data-testid=ip-typeOption]').eq(1).click();
      cy.get('@mockedOnTypeChange').should('have.been.calledOnceWith', ICON_TYPES[1]);
    });

    it('test onTypeChange -- onTypeChange should fire even when type is present', () => {
      cy.mount(
        <TypeSelector
          selectedType={ICON_TYPES[0]}
          setSelectedType={cy.stub()}
          onTypeChange={cy.stub().as('mockedOnTypeChange')}
          type={ICON_TYPES[2]}
        />,
      );
      cy.get('[data-testid=ip-typeContainer]').click();
      cy.get('[data-testid=ip-typeOption]').eq(1).click();
      cy.get('@mockedOnTypeChange').should('have.been.calledOnceWith', ICON_TYPES[1]);
    });
  });
});

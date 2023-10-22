import { IconPlaceholder } from '../../src/components/IconPlaceholder';
import { ICON_BASE_STYLE, ICON_CONTAINER_BASE_STYLE } from '../../src/lib/styles';
import { verifyComputedStyle } from '../lib/util';

describe('tests for IconPlaceholder', () => {
  describe('all elements should be rendered correctly', () => {
    it('all elements should be in the document', () => {
      cy.mount(<IconPlaceholder />);
      cy.get('[data-testid=ip-iconPlaceholderContainer]').should('exist');
      cy.get('[data-testid=ip-iconPlaceholderContainer]').should('not.be.visible');
      cy.get('[data-testid=ip-iconPlaceholder]').should('exist');
      cy.get('[data-testid=ip-iconPlaceholder]').should('not.be.visible');
    });

    it('all elements should have the correct base style', () => {
      cy.mount(<IconPlaceholder />);
      verifyComputedStyle('[data-testid=ip-iconPlaceholderContainer]', {
        ...ICON_CONTAINER_BASE_STYLE,
        visibility: 'hidden',
      });
      verifyComputedStyle('[data-testid=ip-iconPlaceholder]', ICON_BASE_STYLE({ hex: '#000000' }), {
        color: ['rgb(0, 0, 0)'],
      });
    });
  });

  describe('test props', () => {
    it('test styles -- iconContainer', () => {
      cy.mount(
        <IconPlaceholder
          styles={{ iconContainer: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}
        />,
      );
      verifyComputedStyle(
        '[data-testid=ip-iconPlaceholderContainer]',
        {
          ...ICON_CONTAINER_BASE_STYLE,
          visibility: 'hidden',
        },
        {
          border: ['1px solid red'],
        },
      );
    });

    it('test styles -- icon', () => {
      cy.mount(
        <IconPlaceholder
          styles={{ icon: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}
        />,
      );
      verifyComputedStyle('[data-testid=ip-iconPlaceholder]', ICON_BASE_STYLE({ hex: '#000000' }), {
        border: ['1px solid red'],
        color: ['rgb(0, 0, 0)'],
      });
    });

    it('test minimizeHeight', () => {
      cy.mount(<IconPlaceholder minimizeHeight={true} />);
      verifyComputedStyle('[data-testid=ip-iconPlaceholderContainer]', {
        ...ICON_CONTAINER_BASE_STYLE,
        height: '1px',
      });
    });
  });
});

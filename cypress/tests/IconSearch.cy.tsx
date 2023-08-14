import { IconSearch } from '../../src/components/IconSearch';
import {
  SEARCH_CONTAINER_BASE_STYLE,
  SEARCH_ICON_BASE_STYLE,
  SEARCH_INPUT_BASE_STYLE,
} from '../../src/lib/styles';
import { verifyComputedStyle } from '../lib/util';

describe('tests for IconSearch', () => {
  it('all elements should be visible', () => {
    cy.mount(<IconSearch setIconSearch={cy.stub()} />);
    cy.get('[data-testid=ip-searchContainer]').should('be.visible');
    cy.get('[data-testid=ip-searchIcon]').should('be.visible');
    cy.get('[data-testid=ip-searchInput]').should('be.visible');
  });

  it('all elements should have the expected default styles', () => {
    cy.mount(<IconSearch setIconSearch={cy.stub()} />);
    verifyComputedStyle('[data-testid=ip-searchContainer]', SEARCH_CONTAINER_BASE_STYLE);
    verifyComputedStyle('[data-testid=ip-searchIcon]', SEARCH_ICON_BASE_STYLE);
    verifyComputedStyle('[data-testid=ip-searchInput]', SEARCH_INPUT_BASE_STYLE, {
      border: ['0px none'],
    });
  });
});

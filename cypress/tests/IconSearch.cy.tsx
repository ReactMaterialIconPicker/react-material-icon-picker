import { IconSearch } from '../../src/components/IconSearch';
import {
  SEARCH_CONTAINER_BASE_STYLE,
  SEARCH_ICON_BASE_STYLE,
  SEARCH_INPUT_BASE_STYLE,
} from '../../src/lib/styles';
import { verifyComputedStyle } from '../lib/util';

describe('tests for IconSearch', () => {
  describe('all elements should be correctly rendered', () => {
    it('all elements should be visible', () => {
      cy.mount(<IconSearch setIconSearch={cy.stub()} />);
      cy.get('[data-testid=ip-searchContainer]').should('be.visible');
      cy.get('[data-testid=ip-searchIcon]').should('be.visible');
      cy.get('[data-testid=ip-searchInput]').should('be.visible');
    });
  });

  describe('elements should have correct styles', () => {
    it('all elements should have the expected default styles', () => {
      cy.mount(<IconSearch setIconSearch={cy.stub()} />);
      verifyComputedStyle('[data-testid=ip-searchContainer]', SEARCH_CONTAINER_BASE_STYLE);
      verifyComputedStyle('[data-testid=ip-searchIcon]', SEARCH_ICON_BASE_STYLE);
      verifyComputedStyle('[data-testid=ip-searchInput]', SEARCH_INPUT_BASE_STYLE, {
        border: ['0px none', '0px'],
      });
    });
  });

  describe('IconSearch should correctly invoke setIconSearch', () => {
    it('clicking ip-searchIcon should invoke setIconSearch with the value of ip-searchInput', () => {
      cy.mount(<IconSearch setIconSearch={cy.stub().as('mockedSetIconSearch')} />);
      cy.get('[data-testid=ip-searchInput]').type('mockedInputValue');
      cy.get('[data-testid=ip-searchIcon]').click();
      cy.get('@mockedSetIconSearch').should('have.been.calledOnceWith', 'mockedInputValue');
    });

    it('clicking ip-searchIcon should invoke setIconSearch with the value of ip-searchInput even if it is empty', () => {
      cy.mount(<IconSearch setIconSearch={cy.stub().as('mockedSetIconSearch')} />);
      cy.get('[data-testid=ip-searchIcon]').click();
      cy.get('@mockedSetIconSearch').should('have.been.calledOnceWith', '');
    });

    it('hitting enter should invoke setIconSearch with the value of ip-searchInput', () => {
      cy.mount(<IconSearch setIconSearch={cy.stub().as('mockedSetIconSearch')} />);
      cy.get('[data-testid=ip-searchInput]').type('mockedInputValue');
      cy.get('[data-testid=ip-searchIcon]').click();
      cy.get('@mockedSetIconSearch').should('have.been.calledOnceWith', 'mockedInputValue');
    });

    it('hitting enter should invoke setIconSearch with the value of ip-searchInput even if it is empty', () => {
      cy.mount(<IconSearch setIconSearch={cy.stub().as('mockedSetIconSearch')} />);
      cy.get('[data-testid=ip-searchIcon]').click();
      cy.get('@mockedSetIconSearch').should('have.been.calledOnceWith', '');
    });
  });

  describe('all props of IconSearch should function correctly', () => {
    it('searchContainer property of styles should update the style of ip-searchContainer', () => {
      cy.mount(
        <IconSearch
          setIconSearch={cy.stub()}
          styles={{
            searchContainer: (baseStyle) => ({
              ...baseStyle,
              color: 'purple',
            }),
          }}
        />,
      );
      verifyComputedStyle('[data-testid=ip-searchContainer]', {
        ...SEARCH_CONTAINER_BASE_STYLE,
        color: 'purple',
      });
    });

    it('searchIcon property of styles should update the style of ip-searchIcon', () => {
      cy.mount(
        <IconSearch
          setIconSearch={cy.stub()}
          styles={{
            searchIcon: (baseStyle) => ({
              ...baseStyle,
              marginRight: '30px',
            }),
          }}
        />,
      );
      verifyComputedStyle('[data-testid=ip-searchIcon]', {
        ...SEARCH_ICON_BASE_STYLE,
        marginRight: '30px',
      });
    });

    it('searchInput property of styles should update the style of ip-searchInput', () => {
      cy.mount(
        <IconSearch
          setIconSearch={cy.stub()}
          styles={{
            searchInput: (baseStyle) => ({
              ...baseStyle,
              position: 'relative',
            }),
          }}
        />,
      );
      verifyComputedStyle(
        '[data-testid=ip-searchInput]',
        { ...SEARCH_INPUT_BASE_STYLE, position: 'relative' },
        {
          border: ['0px none'],
        },
      );
    });

    it('defaultSearchValue should sets the default value of ip-searchInput', () => {
      cy.mount(<IconSearch setIconSearch={cy.stub()} defaultSearchValue='mockedDefaultValue'/>);
      cy
        .get('[data-testid=ip-searchInput]')
        .should('have.value', 'mockedDefaultValue')
        .clear()
        .type('mockedValue')
        .should('have.value', 'mockedValue');
    });

    it('searchValue should sets the value of ip-searchInput', () => {
      cy.mount(<IconSearch setIconSearch={cy.stub()} searchValue='mockedValue'/>);
      cy
        .get('[data-testid=ip-searchInput]')
        .should('have.value', 'mockedValue')
        .type('newMockedValue')
        .should('have.value', 'mockedValue');
    });

    it('searchValue should override defaultSearchValue', () => {
      cy.mount(<IconSearch setIconSearch={cy.stub()} searchValue='mockedValue' defaultSearchValue='mockedDefaultValue'/>);
      cy
        .get('[data-testid=ip-searchInput]')
        .should('have.value', 'mockedValue')
    });

    it('onSearchValueChange should be invoked with the new value of ip-searchInput when the value changes', () => {
      cy.mount(<IconSearch setIconSearch={cy.stub()} onSearchValueChange={cy.stub().as('onSearchValueChange')}/>);
      cy
        .get('[data-testid=ip-searchInput]')
        .type('mockedValue')
        .then(() => {
          let str = '';
          for(const x of 'mockedValue') {
            str += x;
            cy.get('@onSearchValueChange').should('be.calledWith', str);
          }
        });
    });

    it('searchBoxPlaceholder should set the placeholder value of ip-searchInput', () => {
      cy.mount(<IconSearch setIconSearch={cy.stub()} searchBoxPlaceholder='mockedPlaceholder'/>);
      cy.get('[data-testid=ip-searchInput]').invoke('attr', 'placeholder').should('eq', 'mockedPlaceholder');
    });
  });
});

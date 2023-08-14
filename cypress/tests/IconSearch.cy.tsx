import { IconSearch } from "../../src/components/IconSearch";

describe('tests for IconSearch', () => {
    it('all elements should be visible', () => {
        const setIconSearch = cy.stub();
        cy.mount(<IconSearch setIconSearch={setIconSearch}/>);
        cy.get('[data-testid=ip-searchContainer]').should('be.visible');
        cy.get('[data-testid=ip-searchIcon]').should('be.visible');
        cy.get('[data-testid=ip-searchInput]').should('be.visible');
    });
});
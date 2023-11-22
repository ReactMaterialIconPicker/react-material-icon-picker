import { MaterialIconPicker } from '../../src/components/MaterialIconPicker';
import { DEFAULT_ICONS_CONTAINER_HEIGHT, ICON_TYPES } from '../../src/lib/constants';

describe('tests for MaterialIconPicker', () => {
  describe('tests for interaction of different components', () => {
    it('changing value of ip-iconSearch should alter the number of icons rendered', () => {
      cy.mount(<MaterialIconPicker />);
      cy.get('[data-testid=ip-iconContainer]').should('exist');
      cy.get('[data-testid=ip-searchInput]').type('impossibleSearchValue');
      cy.get('[data-testid=ip-searchInput]').type('{enter}');
      cy.get('[data-testid=ip-iconContainer]').should('not.exist');
    });

    it('changing icon type should alter the type of icons rendered', () => {
      cy.mount(<MaterialIconPicker />);
      cy.get('[data-testid=ip-icon]').should('have.class', 'material-icons');
      cy.get('[data-testid=ip-typeContainer]').click();
      cy.get('[data-testid=ip-typeOption]').eq(1).click();
      cy.get('[data-testid=ip-icon]').should('have.class', `material-icons-${ICON_TYPES[1].value}`);
    });

    it('changing icon color should alter the color style of icons rendered', () => {
      cy.mount(<MaterialIconPicker />);
      cy.get('[data-testid=ip-icon]').then((elements) =>
        expect(elements[0].style.color).equal('rgb(0, 0, 0)'),
      );
      cy.get('[data-testid=ip-colorSelectorContainer]').click();
      cy.get('[data-testid=ip-paletteSaturation]').click(10, 10);
      cy.get('[data-testid=ip-icon]').then((elements) =>
        expect(elements[0].style.color).equal('rgb(242, 230, 230)'),
      );
    });
  });

  describe('tests for iconsContainer height', () => {
    it("when MaterialIconPicker's container has height: 100%, iconsContainer should have height DEFAULT_ICONS_CONTAINER_HEIGHT", () => {
      cy.mount(
        <div style={{ height: '100%' }}>
          <MaterialIconPicker />
        </div>,
      );
      cy.get('[data-testid=ip-iconsContainer]').then((elements) => {
        expect(window.getComputedStyle(elements[0]).height).to.equal(
          `${DEFAULT_ICONS_CONTAINER_HEIGHT}px`,
        );
      });
    });

    it("when MaterialIconPicker's container has height: 100px (small height), iconsContainer should have height DEFAULT_ICONS_CONTAINER_HEIGHT", () => {
      cy.mount(
        <div style={{ height: '100px' }}>
          <MaterialIconPicker />
        </div>,
      );
      cy.get('[data-testid=ip-iconsContainer]').then((elements) => {
        expect(window.getComputedStyle(elements[0]).height).to.equal(
          `${DEFAULT_ICONS_CONTAINER_HEIGHT}px`,
        );
      });
    });

    it("when MaterialIconPicker's container has height: 300px (large height), iconsContainer should have flexible height", () => {
      cy.mount(
        <div style={{ height: '300px' }}>
          <MaterialIconPicker />
        </div>,
      );
      cy.get('[data-testid=ip-iconsContainer]').then((elements) => {
        expect(window.getComputedStyle(elements[0]).height).to.equal('220px');
      });
    });
  });
});

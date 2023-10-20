import { MaterialIconsPicker } from "../../src";
import { ICONS_CONTAINER_BASE_STYLE } from "../../src/lib/styles";
import { countNumberOfElementsInRow } from "../../src/lib/utils";
import { verifyComputedStyle } from "../lib/util";

describe('tests for Icons', () => {
    describe('all elements should be rendered correctly', () => {
        it('the container should be visible', () => {
            cy.mount(<MaterialIconsPicker />);
            cy.get('[data-testid=ip-iconsContainer]').should('be.visible');
        });

        it('number of icons rendered should be divisible by the number of icons in a row under various width', () => {
            let width = 250;
            for(let widthIncre = 0; widthIncre < 100; widthIncre++) {
                width += 10;
                cy.viewport(width, 500);
                cy.mount(<MaterialIconsPicker />);
                cy
                    .get('[data-testid=ip-iconContainer]')
                    .then(elements => {
                        const actualColumnCount = countNumberOfElementsInRow(elements as any);
                        expect(elements.length % actualColumnCount === 0);
                    });
            }
        });

        it('the container should have the correct base style', () => {
            cy.mount(<MaterialIconsPicker />);
            verifyComputedStyle('[data-testid=ip-iconsContainer]', ICONS_CONTAINER_BASE_STYLE);
        });
    });

    describe('test props', () => {
        it('test styles -- iconsContainer', () => {
            cy.mount(<MaterialIconsPicker styles={{ iconsContainer: baseStyle => ({ ...baseStyle, border: '1px solid red' }) }} />);
            verifyComputedStyle('[data-testid=ip-iconsContainer]', ICONS_CONTAINER_BASE_STYLE, {
                border: ['1px solid red']
            });
        })
    });
});
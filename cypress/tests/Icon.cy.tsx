import { MaterialIconsPicker } from "../../src";
import { verifyComputedStyle } from "../lib/util";
import { ICON_BASE_STYLE, ICON_CONTAINER_BASE_STYLE, ICON_TIP_BASE_STYLE } from "../../src/lib/styles";
import { hsvaToHex } from "@uiw/color-convert";
import { MATERIAL_ICONS } from "../../src/assets/materialIcons";

describe('tests for Icon', () => {
    describe('all elements should be correctly rendered', () => {
        it('all elements should have the correct base style', () => {
            cy.mount(<MaterialIconsPicker />);
            verifyComputedStyle('[data-testid=ip-iconContainer]', ICON_CONTAINER_BASE_STYLE);
            verifyComputedStyle('[data-testid=ip-icon]', ICON_BASE_STYLE({ hex: hsvaToHex({ h: 0, s: 0, v: 0, a: 1 }) }), {
                color: ['rgb(0, 0, 0)']
            });
            verifyComputedStyle('[data-testid=ip-iconTip]', ICON_TIP_BASE_STYLE({ top: 0, left: 0, visibility: 'hidden' }), {
                fontFamily: ['"Arial serif"'],
            }, ['left', 'top']);
        });

        it('icon tip should not be visible by default', () => {
            cy.mount(<MaterialIconsPicker />);
            cy.get('[data-testid=ip-iconContainer]').should('be.visible');
            cy.get('[data-testid=ip-icon]').should('be.visible');
            cy.get('[data-testid=ip-icon]').eq(0).should('have.text', MATERIAL_ICONS[0]);
            cy.get('[data-testid=ip-iconTip]').should('not.be.visible');
        });

        it('icon tip should be visible after when mouse is hovered over icon container', () => {
            cy.mount(<MaterialIconsPicker />);
            cy.get('[data-testid=ip-iconContainer]').eq(0).trigger('mouseover');
            cy.get('[data-testid=ip-iconTip]').eq(0).should('be.visible');
            cy.get('[data-testid=ip-iconContainer]').eq(0).trigger('mouseout');
            cy.get('[data-testid=ip-iconTip]').eq(0).should('not.be.visible');
        });
    });

    describe('test props', () => {
        it('verify styles --iconTip', () => {
            cy.mount(<MaterialIconsPicker styles={{ iconTip: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}/>);
            verifyComputedStyle('[data-testid=ip-iconTip]', ICON_TIP_BASE_STYLE({ top: 0, left: 0, visibility: 'hidden' }), {
                fontFamily: ['"Arial serif"'],
                border: ['1px solid red']
            }, ['left', 'top']);
        });
        
        it('verify styles -- iconContainer', () => {
            cy.mount(<MaterialIconsPicker styles={{ iconContainer: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}/>);
            verifyComputedStyle('[data-testid=ip-iconContainer]', ICON_CONTAINER_BASE_STYLE, { border: ['1px solid red'] });
        });

        it('verify styles -- icon', () => {
            cy.mount(<MaterialIconsPicker styles={{ icon: (baseStyle) => ({ ...baseStyle, border: '1px solid red' }) }}/>);
            verifyComputedStyle('[data-testid=ip-icon]', ICON_BASE_STYLE({ hex: hsvaToHex({ h: 0, s: 0, v: 0, a: 1 }) }), {
                color: ['rgb(0, 0, 0)'],
                border: ['1px solid red']
            });
        });

        it('verify onIconClick -- onIconClick should be called when an icon container is clicked', () => {
            cy.mount(<MaterialIconsPicker onIconClick={cy.stub().as('mockedOnIconClick')}/>);
            cy.get('[data-testid=ip-iconContainer]').eq(0).click();
            cy.get('@mockedOnIconClick').should('have.been.calledOnceWith', MATERIAL_ICONS[0]);
        });

        it('verify onIconMouseEnter -- onIconMouseEnter should be called when an icon container is mouse entered', () => {
            cy.mount(<MaterialIconsPicker onIconMouseEnter={cy.stub().as('mockedOnIconMouseEnter')}/>);
            cy.get('[data-testid=ip-iconContainer]').eq(0).trigger('mouseover');
            cy.get('@mockedOnIconMouseEnter').should('have.been.calledOnceWith', MATERIAL_ICONS[0]);
        });

        it('verify setIconTipText -- setIconTipText should set icon tip content', () => {
            cy.mount(<MaterialIconsPicker setIconTipText={iconTipText => `mocked${iconTipText}`} />);
            cy.get('[data-testid=ip-iconTip]').eq(0).should('have.text', `mocked${MATERIAL_ICONS[0]}`);
        });
    });
});
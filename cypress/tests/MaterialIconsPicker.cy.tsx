import { MaterialIconsPicker } from "../../src/components/MaterialIconsPicker";

describe('tests for MaterialIconsPicker', () => {
    it('placeholder', () => {
        cy.mount(<MaterialIconsPicker test={'1'}/>);
    })
})
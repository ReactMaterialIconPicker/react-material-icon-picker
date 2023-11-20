import { MaterialIconPicker } from '../../src';

it('dev', () => {
  cy.mount(<div style={{
    // height: '100px',
    // height: '300px',
    height: '100%',
    border: '1px solid red'
  }}>
      <MaterialIconPicker />
    </div>);
});

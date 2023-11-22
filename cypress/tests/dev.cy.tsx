import { useState } from 'react';
import { MaterialIconPicker } from '../../src';

const TestComponent = () => {
  const [styles, setStyles] = useState<any>({});
  const [search, setSearch] = useState<string>('');

  return (
    <div
      style={{
        // height: '100px',
        // height: '300px',
        height: '100%',
      }}
    >
      <MaterialIconPicker
        styles={styles}
        searchValue={search}
        onSearchValueChange={(newSearch) => setSearch(newSearch)}
      />
      <div
        style={{ marginBottom: '10px' }}
        onClick={() =>
          setStyles({
            searchContainer: (baseStyle: any) => ({ ...baseStyle, border: '1px solid red' }),
          })
        }
      >
        1
      </div>
      <div onClick={() => setStyles({ searchContainer: (baseStyle: any) => ({ ...baseStyle }) })}>
        2
      </div>
    </div>
  );
};

it('dev', () => {
  cy.mount(<TestComponent />);
});

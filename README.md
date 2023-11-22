# react-material-icon-picker

[![npm package][npm-img]][npm-url]
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

If you like the project, please give the project a GitHub 🌟

## Demo

![image info](./docs/pics/demo.gif)

[npm-img]: https://img.shields.io/npm/v/react-material-icon-picker
[npm-url]: https://www.npmjs.com/package/react-material-icon-picker

[![Edit ReactMaterialIconPicker](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vigilant-glade-vj69k5?file=/src/App.jsx)

## Install

```bash
npm install react-material-icon-picker
```

## Usage

```ts
import { MaterialIconPicker } from 'react-material-icon-picker';

const MyComponent = () => {
  return (
    <div>
      <MaterialIconPicker />
    </div>
  );
};
```

[Documentation](https://reactmaterialiconpicker.github.io/demo/)

## Props

Please visit the **above link** to view the full documentation.

**defaultSearchValue?: string**<br>
A default value for the search input box

**searchValue?: string**<br>
A fixed value for the search input box<br>
`searchValue` overrides `defaultSearchValue`

**onSearchValueChange?: (value: string) => void**<br>
A function that will be called when value of the search input box changes

**onSearchValueSettled?: (value: string) => void**<br>
A function that will be called when a new search value is settled

- when 'return' key is hit when focusing on the search input box or
- the Magnifying Glass icon is clicked

**searchBoxPlaceholder?: string**<br>
The placeholder value of the search input box

**type?: Type**<br>
type of material icons

```
type Type = {
  label: string;
  value: string;
};
```

**onTypeChange?: (type: Type) => void**<br>
A function that will be called when a new type is selected

**hsva?: Hsva**<br>
A fixed value for the color of material icons

```
type Hsva = {
  h: number;
  s: number;
  v: number;
  a: number;
};
```

**onHsvaChange?: (hsva: Hsva) => void**<br>
A function that will be called when the color of material icons changes

**onIconClick?: (icon: string) => void**<br>
A function that will be called when an icon is clicked

**onIconMouseEnter?: (icon: string) => void**<br>
A function that will be called when an icon is mouse entered

**setIconTipText?: (icon: string) => string**<br>
A function that customize icon tip

**onIconsScroll?: (e: React.SyntheticEvent) => void**<br>

A function that is called when the icons container is scrolled

**disableLoader?: boolean**<br>
If true, disable the loader icon when user scrolls to the bottom (`false` as default)

**styles?: IStyles**<br>
Custom style of elements of the component

```
/*
StyleUpdater takes the original style of the element and returns the custom style of the element
*/

interface IStyles {
  container?: StyleUpdater;
  searchContainer?: StyleUpdater;
  searchIcon?: StyleUpdater;
  searchInput?: StyleUpdater;
  optionContainer?: StyleUpdater;
  typeContainer?: StyleUpdater;
  typeSelected?: StyleUpdater;
  typeArrow?: StyleUpdater;
  typeOptionsContainer?: StyleUpdater;
  typeOption?: StyleUpdater;
  colorSelectorContainer?: StyleUpdater;
  colorSelectedIndicator?: StyleUpdater;
  colorSelected?: StyleUpdater;
  colorSelectorArrow?: StyleUpdater;
  paletteContainer?: StyleUpdater;
  saturation?: StyleUpdater;
  hue?: StyleUpdater;
  iconsContainer?: StyleUpdater;
  iconContainer?: StyleUpdater;
  icon?: StyleUpdater;
  iconTip?: StyleUpdater;
  loaderContainer?: StyleUpdater;
  loader?: StyleUpdater;
  iconsContainerPlaceholder?: StyleUpdater;
}

type StyleObject = Record<string, string | number>;
type StyleUpdater = (baseStyle: StyleObject) => StyleObject;
```

## Contributing

Your contribution is greatly appreciated! Feel free to fork the repo, make some changes, submit a pull-request! You may also submit a issue to report any bug:)

## License

MIT

[build-img]: https://github.com/ryansonshine/typescript-npm-package-template/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/ryansonshine/typescript-npm-package-template/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/typescript-npm-package-template
[downloads-url]: https://www.npmtrends.com/typescript-npm-package-template
[issues-img]: https://img.shields.io/github/issues/ryansonshine/typescript-npm-package-template
[issues-url]: https://github.com/ryansonshine/typescript-npm-package-template/issues
[codecov-img]: https://codecov.io/gh/ryansonshine/typescript-npm-package-template/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/ryansonshine/typescript-npm-package-template
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

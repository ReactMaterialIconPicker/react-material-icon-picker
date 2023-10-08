export type StyleObject = Record<string, string | number>;
export type StyleUpdater = (baseStyle: StyleObject) => StyleObject;
export type Type = {
  label: string;
  value: string;
};
export type Hsva = {
  h: number;
  s: number;
  v: number;
  a: number;
};

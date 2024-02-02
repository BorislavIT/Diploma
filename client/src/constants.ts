export const breakpoints = {
  mobile: 576,
  tablet: 768,
  desktop: 992,
};

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export type User = {
  firstName: string;
  lastName: string;
  age: number;
};

export const LOCAL_STORAGE_ITEM_KEYS = {
  THEME: "THEME",
};

export const MODULES = {
  SETTINGS: {
    PATH: "/settings",
  },
  INVESTMENTS: {
    PATH: "/investments",
  },
};

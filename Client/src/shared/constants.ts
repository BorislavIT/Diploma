export const breakpoints = {
  mobile: 576,
  tablet: 768,
  desktop: 992,
};

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export const LOCAL_STORAGE_ITEM_KEYS = {
  THEME: "THEME",
};

export const MODULES = {
  HOME: "/",
  ACCOUNT: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  SHOP: {
    PATH: "/shop",
  },
  ORDERS: {
    PATH: "/orders",
  },
};

export const ENDPOINTS = {
  ACCOUNT: {
    PATH: "/Account",
    LOGIN: "/Login",
    IDENTIFY: "/Identify",
    REGISTER: "/Register",
  },
  MP3S: {
    PATH: "/Mp3",
  },
};

export const COOKIE_NAMES = {
  AUTH_TOKEN: "authToken",
};

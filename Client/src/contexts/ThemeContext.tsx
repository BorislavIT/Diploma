import { THEME, LOCAL_STORAGE_ITEM_KEYS } from "@/shared/constants";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext<{
  theme: THEME;
  toggleTheme: () => void;
} | null>(null);

export const useTheme = () => useContext(ThemeContext)!;

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<THEME>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

  const getThemeFromLocalStorage = () => {
    return localStorage.getItem(LOCAL_STORAGE_ITEM_KEYS.THEME) === THEME.LIGHT
      ? THEME.LIGHT
      : THEME.DARK;
  };

  const getThemeFromBrowserSettings = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? THEME.DARK
      : THEME.LIGHT;
  };

  useEffect(() => {
    const storedTheme =
      getThemeFromLocalStorage() || getThemeFromBrowserSettings();

    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    const rootElement = document.documentElement;

    if (theme === THEME.LIGHT) {
      rootElement.style.setProperty("--theme-primary-color", "#FFFFFF");
      rootElement.style.setProperty("--theme-secondary-color", "#F0F0F0");
      rootElement.style.setProperty("--theme-border-color", "#333333");
      rootElement.style.setProperty("--theme-text-color", "#333333");
    } else {
      rootElement.style.setProperty("--theme-primary-color", "#121212");
      rootElement.style.setProperty("--theme-secondary-color", "#222222");
      rootElement.style.setProperty("--theme-border-color", "#444444");
      rootElement.style.setProperty("--theme-text-color", "#E0E0E0");
    }

    localStorage.setItem(LOCAL_STORAGE_ITEM_KEYS.THEME, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

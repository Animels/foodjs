import { Dispatch, ReactElement, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

type IThemeContext = {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  setTheme: () => {}
});

const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      return 'dark'
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      return 'light'
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };

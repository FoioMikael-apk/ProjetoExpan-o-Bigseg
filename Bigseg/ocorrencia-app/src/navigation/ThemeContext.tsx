import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

type ThemeContextType = {
  toggleTheme: () => void;
  isDarkTheme: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  isDarkTheme: false,
});

export const useThemeContext = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Começa no claro!

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const theme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

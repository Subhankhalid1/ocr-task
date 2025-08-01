import { THEME_CONTEXT, THEME_TYPE } from '../types/theme';
import { darkTheme, lightTheme } from '../constants/theme';
import { useEffect, useState } from 'react';

export const useThemeToggle = () => {
  const [theme, setTheme] = useState<THEME_TYPE>(THEME_TYPE.light);
  const [themeConfig, setThemeConfig] = useState<THEME_CONTEXT['themeConfig']>(lightTheme);

  const toggle = () => {
    if (theme === THEME_TYPE.light) {
      setTheme(THEME_TYPE.dark);
    } else {
      setTheme(THEME_TYPE.light);
    }
  };

  useEffect(() => {
    setThemeConfig(theme === THEME_TYPE.light ? lightTheme : darkTheme);
  }, [theme]);

  return {
    theme,
    themeConfig,
    toggle,
  };
};

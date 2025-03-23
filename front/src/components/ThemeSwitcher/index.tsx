import { Switch } from '@components/core';
import { useTheme } from '@context';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const onClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return <Switch state={theme === 'light' ? true : false} onClick={onClick}></Switch>;
};

export { ThemeSwitcher };

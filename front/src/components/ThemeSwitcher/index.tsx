import { useTheme } from '@context';
import { Switch } from 'components/Switch';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const onClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return <Switch state={theme === 'light' ? true : false} onClick={onClick}></Switch>;
};

export { ThemeSwitcher };

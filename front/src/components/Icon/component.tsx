import { makeClassName } from '@utils';

import './component.css';
import { ICON_TYPES } from './types';

type ButtonProps = {
  icon: ICON_TYPES;
  className?: string;
  onClick?: () => void;
  size?: 's' | 'm' | 'l';
};

const icons = import.meta.glob('../../assets/*', { eager: true });

const Icon = ({ icon, size, className, onClick }: ButtonProps) => {
  const dIcon = icons[`../../assets/${icon}${icon === ICON_TYPES.LOADER ? '.gif' : '.svg'}`]?.default;

  return (
    <div className={makeClassName('icon', undefined, { mixin: className, key: size })} onClick={onClick}>
      <img className={makeClassName('icon', 'body', { key: size })} src={dIcon}></img>
    </div>
  );
};

export { Icon };

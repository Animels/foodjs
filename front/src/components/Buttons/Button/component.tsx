import { makeClassName } from '@utils';
import { Icon } from 'components/Icon/component';
import { ICON_TYPES } from 'components/Icon/types';
import { ReactElement, memo, useState } from 'react';

import './component.css';

type ButtonProps = {
  children?: string | string[] | ReactElement;
  className?: string;
  onClick?: () => unknown;
  variant?: 'primary' | 'secondary' | 'transparent' | 'round' | 'drop';
  size?: 's' | 'm' | 'l';
  height?: string;
  width?: string;
  fullWidth?: boolean;
};

const Button = ({ children, className, onClick, variant, size, fullWidth = false }: ButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const combinedOnclick = () => {
    if (onClick) onClick();
    if (variant === 'drop') setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={combinedOnclick}
      className={makeClassName('button', undefined, {
        fullWidth,
        key: variant ?? 'primary',
        key1: variant === 'round' ? `round${size}` : size,
        mixin: className,
      })}
    >
      {children}
      {variant === 'drop' && (
        <Icon className={makeClassName('button', 'icon')} icon={isOpen ? ICON_TYPES.CARET_UP : ICON_TYPES.CARET_DOWN} />
      )}
    </div>
  );
};

const memoButton = memo(Button);

export { memoButton as Button };

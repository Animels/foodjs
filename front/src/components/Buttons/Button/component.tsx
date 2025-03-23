import { ICON_TYPES, Icon } from '@components/core';
import { makeClassName } from '@utils';
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

const Button = ({ children, className, onClick, variant = 'primary', size, fullWidth = false }: ButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const combinedOnclick = () => {
    if (onClick) onClick();
    if (variant === 'drop') setIsOpen(!isOpen);
  };

  return (
    <button
      onClick={combinedOnclick}
      className={makeClassName('button', undefined, {
        fullWidth,
        key: variant,
        key1: variant === 'round' ? `round${size}` : size,
        mixin: className,
      })}
    >
      {children}
      {variant === 'drop' && (
        <Icon className={makeClassName('button', 'icon')} icon={isOpen ? ICON_TYPES.CARET_UP : ICON_TYPES.CARET_DOWN} />
      )}
    </button>
  );
};

const memoButton = memo(Button);

export { memoButton as Button };

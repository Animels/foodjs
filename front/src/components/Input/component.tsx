import { Icon, Text } from '@components';
import { makeClassName } from '@utils';
import { ICON_TYPES } from 'components/Icon/types';
import { ChangeEvent, forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import './component.css';

type InputProps = {
  className?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  label?: string;
  field?: ControllerRenderProps;
  fullWidth?: boolean;
  disabled?: boolean;
};

const Input = forwardRef(({ className, placeholder, onChange, onClear, label, field, fullWidth, disabled }: InputProps, ref) => {
  const intRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => intRef.current!);

  const customOnClear = useCallback(() => {
    if (intRef.current) intRef.current.value = '';
    if (onClear) onClear();
  }, []);

  return (
    <div className={makeClassName('input', undefined, { fullWidth })}>
      {label && <Text>{label}</Text>}
      <input
        onChange={onChange}
        ref={intRef}
        {...field}
        className={makeClassName('input', 'inner', { mixin: className })}
        placeholder={placeholder}
        disabled={disabled}
      />
      {onClear && intRef.current && intRef.current?.value !== '' && (
        <Icon className={makeClassName('input', 'clear')} icon={ICON_TYPES.X} onClick={customOnClear} size="s"></Icon>
      )}
    </div>
  );
});

const mem = memo(Input);

export { mem as Input };
export type { InputProps };

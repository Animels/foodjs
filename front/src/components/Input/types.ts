import { ChangeEvent } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

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

export type { InputProps };

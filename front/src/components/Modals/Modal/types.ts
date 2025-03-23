import { ReactNode } from 'react';
import { FieldValues, UseFormReset } from 'react-hook-form';

export type ModalProps<T extends FieldValues = Record<string, unknown>> = {
  children: ReactNode;
  className?: string;
  onClose?: (any: boolean) => void;
  modalLabel?: string;
  reset?: UseFormReset<T>;
};

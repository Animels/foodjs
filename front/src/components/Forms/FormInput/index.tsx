import { Input } from '@components/Input';
import type { InputProps } from '@components/Input/types';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import './index.css';

type ControlProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  inputProps?: InputProps;
};

const FormInput = <T extends FieldValues>({ control, name, inputProps, label }: ControlProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {label && <label htmlFor={field.name as string}>{label}</label>}
          <Input {...field} {...inputProps}></Input>
          {error && <div>{error.message}</div>}
        </>
      )}
    ></Controller>
  );
};

export { FormInput };

import { Button, Form, FormInput, MultiForm, MultiModal, Text } from '@components';
import { ModalProps } from '@components/Modals/Modal/types';
import { StepProvider, useAuth, useModal } from '@context';
import { makeClassName } from '@utils';
import { FieldValues, useForm } from 'react-hook-form';

import './index.css';

type LoginModalProps<T extends FieldValues> = Omit<ModalProps<T>, 'children'>;

const LoginModal = <T extends FieldValues>({ onClose }: LoginModalProps<T>) => {
  const { login } = useAuth();
  const { closeModal } = useModal();
  const { control, getValues, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLogin = () => {
    login(getValues());
    closeModal('login');
  };

  return (
    <StepProvider>
      <MultiModal onClose={onClose} modalLabel="Login" reset={reset}>
        <div className={makeClassName('login-modal')}>
          <MultiForm className={makeClassName('login-modal', 'form')}>
            <Form bodyRenderrer={<Text>Super Food is only here</Text>} primaryActionRenderrer={<Button>To Login</Button>} />
            <Form
              bodyRenderrer={
                <>
                  <FormInput name={'email'} control={control} inputProps={{ placeholder: 'email' }} />
                  <FormInput name={'password'} control={control} inputProps={{ placeholder: 'password' }} />
                </>
              }
              primaryActionRenderrer={<Button onClick={() => onLogin()}>Login</Button>}
            />
          </MultiForm>
        </div>
      </MultiModal>
    </StepProvider>
  );
};

export { LoginModal };

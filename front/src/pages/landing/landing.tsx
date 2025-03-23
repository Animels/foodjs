import testImg from '@assets/landing_img.webp';
import { Button, Form, FormInput, MultiForm } from '@components';
import { StepProvider, useAuth } from '@context';
import { makeClassName } from '@utils';
import { useForm } from 'react-hook-form';

import './index.css';

const Landing = () => {
  const { register } = useAuth();
  const { control, getValues } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className={makeClassName('landing')}>
      <StepProvider>
        <MultiForm className={makeClassName('landing', 'form')} heading="Registration!">
          <Form
            bodyRenderrer={<FormInput inputProps={{ placeholder: 'email', fullWidth: true }} name="email" control={control} />}
            primaryActionRenderrer={<Button fullWidth={true}>Continue</Button>}
          />
          <Form
            bodyRenderrer={
              <FormInput inputProps={{ placeholder: 'password', fullWidth: true }} name="password" control={control} />
            }
            primaryActionRenderrer={
              <Button fullWidth={true} onClick={() => register(getValues())}>
                Register
              </Button>
            }
          />
        </MultiForm>
      </StepProvider>

      <img className={makeClassName('landing', 'img')} src={testImg} />
    </div>
  );
};

export { Landing };

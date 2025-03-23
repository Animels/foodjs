import { Button, Header, ThemeSwitcher } from '@components';
import { useModal } from '@context';
import { makeClassName } from '@utils';

import { LoginModal } from '../LoginModal';

import './index.css';

export const UnauthHeader = () => {
  const { openModal } = useModal();

  return (
    <Header
      logoRenderrer={() => <div>FoodJs</div>}
      className={makeClassName('landing-header')}
      actionRenderrer={() => (
        <>
          <Button onClick={() => openModal({ id: 'login', component: LoginModal })}>Login</Button>
          <ThemeSwitcher />
        </>
      )}
    />
  );
};

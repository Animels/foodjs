import { Button, Header, LoginModal, ThemeSwitcher } from '@components';
import { useModal } from '@context';

export const UnauthHeader = () => {
  const { openModal } = useModal();

  return (
    <Header
      logoRenderrer={() => <div>FoodJs</div>}
      actionRenderrer={() => (
        <>
          <Button onClick={() => openModal({ id: 'login', component: LoginModal })}>Login</Button>
          <ThemeSwitcher />
        </>
      )}
    />
  );
};

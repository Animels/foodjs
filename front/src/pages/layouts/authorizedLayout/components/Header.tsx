import { Button, Header, Icon, Popover, ThemeSwitcher } from '@components';
import { useAuth } from '@context';
import { ICON_TYPES } from 'components/Icon/types';

export const AuthHeader = () => {
  const { logout } = useAuth();

  const profileOptions = [
    { display: 'Subscribe', onClick: () => console.log('Subsribe') },
    { display: 'Vouchers', onClick: () => console.log('Vouchers') },
    { display: 'Profile', onClick: () => console.log('Profile') },
    { display: 'Rewards', onClick: () => console.log('Rewards') },
    { display: 'Orders', onClick: () => console.log('Orders') },
    { display: 'Help', onClick: () => console.log('Help'), delimeterBefore: true },
    { display: 'Logout', onClick: () => logout() },
  ];

  const langOptions = [
    { display: 'ES', onClick: () => console.log('Translate to es') },
    { display: 'RUS', onClick: () => console.log('Translate to RUS') },
    { display: 'OBOSRUS', onClick: () => console.log('Translate to OBOSRUS') },
  ];

  return (
    <Header
      logoRenderrer={() => <div>FoodJs</div>}
      actionRenderrer={() => (
        <>
          <Popover triggerRenderrer={() => <Button variant='drop'>Profile</Button>} items={profileOptions} />
          <Popover triggerRenderrer={() => <Button variant='drop'>Lang</Button>} items={langOptions} />
          <Icon icon={ICON_TYPES.CART} />
          <Icon icon={ICON_TYPES.HEART} />
          <ThemeSwitcher />
        </>
      )}
    />
  );
};

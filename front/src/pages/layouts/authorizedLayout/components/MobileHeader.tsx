import { Header, Icon, Text } from '@components';
import { ICON_TYPES } from 'components/Icon/types';

const MobileHeader = () => {
  return (
    <Header
      logoRenderrer={() => <Icon icon={ICON_TYPES.HEART}></Icon>}
      bodyRenderrer={() => <Text>FoodJS</Text>}
      actionRenderrer={() => <Icon icon={ICON_TYPES.CART}></Icon>}
    />
  );
};

export { MobileHeader };

import { Text } from '@components';
import { makeClassName } from '@utils';

import './component.css';
import { useRestaurauntStore } from 'store';

type CuisineCardProps = {
  previewImg: string;
  name: string;
  type: string
  size?: 'sm' | 'l' | 'xl';
};

const CuisineCard = ({ previewImg, name, type }: CuisineCardProps) => {
  const updateFilter = useRestaurauntStore((state) => state.updateFilters)

  const onClick = () => updateFilter('cusine', type)

  return (
    <div className={makeClassName('cuisine-card')} onClick={onClick}>
      <img className={makeClassName('cuisine-card', 'prev')} src={previewImg} />
      <div className={makeClassName('cuisine-card', 'container')}>
        <Text>{name}</Text>
      </div>
    </div>
  );
};

export { CuisineCard };

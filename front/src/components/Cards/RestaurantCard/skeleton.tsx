import { makeClassName } from '@utils';

import './skeleton.css';

const SkeletonRestaurantCard = ({ size }: { size?: 's' | 'm' | 'l' }) => {
  return <div className={makeClassName('skeleton-rest-card', undefined, { key: size })}></div>;
};

export { SkeletonRestaurantCard };

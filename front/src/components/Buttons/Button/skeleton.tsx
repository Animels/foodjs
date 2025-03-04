import { makeClassName } from '@utils';

import './skeleton.css';

const SkeletonButton = ({ variant }: { variant?: 'primary' | 'secondary' | 'transparent' | 'round' | 'drop' }) => {
  return <div className={makeClassName('skeleton-button', undefined, { key: variant ?? 'primary' })}></div>;
};

export { SkeletonButton };

import { makeClassName } from '@utils';

import './skeleton.css';

const SkeletonText = () => {
  return <div className={makeClassName('skeleton-text-container')}></div>;
};

export { SkeletonText };

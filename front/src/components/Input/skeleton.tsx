import { makeClassName } from '@utils';

import './skeleton.css';

const SkeletonInput = ({ height }: { height?: string }) => {
  return <div className={makeClassName('skeleton-input')} style={{ height: height }}></div>;
};

export { SkeletonInput };

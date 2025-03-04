import { makeClassName } from '@utils';

import './skeleton.css';

const SkeletonStateButton = ({ type }: { type: 'radio' | 'round' | 'checkbox' }) => {
  return (
    <div className={makeClassName('skeleton-state-button', undefined, { round: type === 'round' })}>
      <div className={makeClassName('skeleton-state-button', 'inner-button', { key: type })}></div>
      <div className={makeClassName('skeleton-state-button', 'inner-text', { key: type })}></div>
    </div>
  );
};

export { SkeletonStateButton };

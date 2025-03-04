import { SkeletonButton, SkeletonInput, SkeletonStateButton, SkeletonText } from '@components';
import { makeClassName } from '@utils';

import './skeleton.css';

const SkeletonSidebarBlock = ({ type, items }: { type: 'radio' | 'round' | 'checkbox'; items: unknown[] }) => {
  return (
    <div className={makeClassName('skeleton-sidebar-block')}>
      <SkeletonText />
      {items.length > 9 && <SkeletonInput />}
      <div className={makeClassName('skeleton-sidebar-block', 'row', { round: type === 'round' })}>
        {items.slice(0, 9).map((_, index) => (
          <SkeletonStateButton type={type} key={index} />
        ))}
        {items.length > 9 && <SkeletonButton />}
      </div>
    </div>
  );
};

export { SkeletonSidebarBlock };

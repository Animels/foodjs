import { makeClassName } from '@utils';
import { SkeletonText } from '@components';

import { SkeletonSidebarBlock } from './components/block/skeleton';
import './skeleton.css';

const SkeletonSideBar = () => {
  const sortingOptions = Array.from({ length: 3 });
  const sortingOptions2 = Array.from({ length: 3 });
  const filterOptions = Array.from({ length: 15 });

  return (
    <aside className={makeClassName('skeleton-sidebar')}>
      <div className={makeClassName('skeleton-sidebar', 'heading')}>
        <SkeletonText />
      </div>

      <SkeletonSidebarBlock type="radio" items={sortingOptions} />
      <SkeletonSidebarBlock type="checkbox" items={filterOptions} />
      <SkeletonSidebarBlock type="round" items={sortingOptions2} />
    </aside>
  );
};

export { SkeletonSideBar };

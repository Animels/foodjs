import { ToSuspend } from 'components/ToSuspend';
import { Suspense } from 'react';

import { Sidebar } from './component';
import { SkeletonSideBar } from './skeleton';

const SupendedSidebar = ({ isSuspended }: { isSuspended: boolean }) => {
  return (
    <Suspense fallback={<SkeletonSideBar />}>
      <ToSuspend isSuspended={isSuspended}>
        <Sidebar />
      </ToSuspend>
    </Suspense>
  );
};

export { SupendedSidebar };

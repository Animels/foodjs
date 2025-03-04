import { ToSuspend } from 'components/ToSuspend';
import { Suspense } from 'react';

import { Input, InputProps } from './component';
import { SkeletonInput } from './skeleton';

const SuspendedInput = ({
  isSuspended,
  inputProps,
  height,
}: {
  isSuspended: boolean;
  inputProps?: InputProps;
  height?: string;
}) => {
  return (
    <Suspense fallback={<SkeletonInput height={height}/>}>
      <ToSuspend isSuspended={isSuspended}>
        <Input {...inputProps} />
      </ToSuspend>
    </Suspense>
  );
};

export { SuspendedInput };

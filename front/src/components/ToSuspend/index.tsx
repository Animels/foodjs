import { memo, ReactNode } from 'react';

const ToSuspend = ({ children, isSuspended }: { children: ReactNode; isSuspended: boolean }) => {
  if (isSuspended) {
    throw new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return <>{children}</>;
};

const mem = memo(ToSuspend)

export { mem as ToSuspend };

import { Carousel } from '.';
import { ToSuspend } from 'components/ToSuspend';
import { ReactNode, Suspense } from 'react';

const SuspendedCarousel = ({
  fallback,
  isLoading,
  children,
  label
}: {
  fallback: ReactNode;
  isLoading: boolean;
  children: ReactNode;
  label?: string
}) => {
  return (
    <Suspense fallback={fallback}>
      <ToSuspend isSuspended={isLoading}>
        <Carousel label={label}>{children}</Carousel>
      </ToSuspend>
    </Suspense>
  );
};

export { SuspendedCarousel };

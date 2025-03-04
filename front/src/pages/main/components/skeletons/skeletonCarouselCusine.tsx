import { Carousel, SkeletonCusineCard } from '@components';

const SkeletonCarouselCusine = ({ label }: { label?: string }) => {
  const items = Array.from({ length: 9 });

  return (
    <Carousel label={label}>
      {items.map((_, index) => (
        <SkeletonCusineCard key={index} />
      ))}
    </Carousel>
  );
};

export { SkeletonCarouselCusine };

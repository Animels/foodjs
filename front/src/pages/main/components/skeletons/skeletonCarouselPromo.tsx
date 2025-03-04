import { Carousel, SkeletonPromoCard } from '@components';

const SkeletonCarouselPromo = ({ label }: { label?: string }) => {
  const items = Array.from({ length: 4 });

  return (
    <Carousel label={label}>
      {items.map((_, index) => (
        <SkeletonPromoCard key={index} />
      ))}
    </Carousel>
  );
};

export { SkeletonCarouselPromo };

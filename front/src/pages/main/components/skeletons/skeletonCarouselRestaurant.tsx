import { Carousel, SkeletonRestaurantCard } from '@components';

const SkeletonCarouselRest = ({ label, size }: { label?: string; size: 's' | 'm' | 'l' }) => {
  const items = Array.from({ length: 4 });

  return (
    <Carousel label={label}>
      {items.map((_, index) => (
        <SkeletonRestaurantCard key={index} size={size} />
      ))}
    </Carousel>
  );
};

export { SkeletonCarouselRest };

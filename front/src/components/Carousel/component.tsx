import { Button } from '@components/Buttons';
import { ICON_TYPES, Icon, Text } from '@components/core';
import { makeClassName } from '@utils';
import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import { useRestaurauntStore } from 'store';

import './component.css';

type CarouselProps = {
  children: ReactNode;
  label?: string;
};

const Carousel = ({ children, label }: CarouselProps) => {
  const carouselRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [isScrolledEnd, setIsScrolledEnd] = useState(false);
  const [isScrolledStart, setIsScrolledStart] = useState(true);
  const filters = useRestaurauntStore((store) => store.filters);

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;

      setIsScrolledEnd(scrollLeft + clientWidth >= scrollWidth - 1);
      setIsScrolledStart(scrollLeft === 0);
    }
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    carouselRef.current.addEventListener('scroll', checkScrollPosition);
    requestAnimationFrame(checkScrollPosition);
    return () => carouselRef.current?.removeEventListener('scroll', checkScrollPosition);
  }, [filters]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className={makeClassName('carousel')}>
      {label && <Text type="h1">{label}</Text>}
      <div className={makeClassName('carousel', 'wrap')}>
        {!isScrolledStart && (
          <Button className={makeClassName('carousel', 'button', { left: true })} onClick={scrollLeft} variant={'round'}>
            <Icon icon={ICON_TYPES.ARROW_LEFT}></Icon>
          </Button>
        )}
        <div ref={carouselRef} className={makeClassName('carousel', 'container')}>
          {children}
        </div>
        {!isScrolledEnd && (
          <Button className={makeClassName('carousel', 'button', { right: true })} onClick={scrollRight} variant={'round'}>
            <Icon icon={ICON_TYPES.ARROW_RIGHT}></Icon>
          </Button>
        )}
      </div>
    </div>
  );
};

export { Carousel };

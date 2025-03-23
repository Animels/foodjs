import { makeClassName } from '@utils';
import { MutableRefObject, ReactNode, useEffect, useRef } from 'react';

import './index.css';

type MaskProps = {
  children: ReactNode;
  className?: string;
};

const Mask = ({ children, className }: MaskProps) => {
  const ref: MutableRefObject<null | HTMLImageElement> = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      const animation = () => {
        if (ref.current) {
          ref.current.style.animation = 'scaleMask 2s ease-in-out forwards';
          ref.current.removeEventListener('mouseenter', animation);
        }
      };

      ref.current.addEventListener('mouseenter', animation);
    }
  }, []);

  return (
    <div ref={ref} className={makeClassName('mask', undefined, { mixin: className })}>
      {children}
    </div>
  );
};

export { Mask };

import { Delimeter, Text } from '@components';
import { makeClassName } from '@utils';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import './index.css';

type PopoverProps = {
  items: { display: string; onClick: () => void; delemeterBefore?: boolean }[];
  triggerRenderrer: () => JSX.Element;
};

const Popover = ({ triggerRenderrer, items }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coord, setCoord] = useState({ top: 0, left: 0 });
  const rootRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = () => {
    if (isOpen && rootRef.current) {
      const rootRect = rootRef.current.getBoundingClientRect();

      setCoord({
        top: rootRect.bottom + 10,
        left: rootRect.left,
      });
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (popoverRef.current !== e.target && !rootRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    updatePosition();

    window.addEventListener('resize', updatePosition);

    if (popoverRef.current) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={makeClassName('')} onClick={() => setIsOpen(!isOpen)}>
      {triggerRenderrer()}

      {isOpen &&
        createPortal(
          <div className={makeClassName('popover')}>
            <div
              ref={popoverRef}
              className={makeClassName('popover', 'container')}
              style={{
                top: coord.top,
                left: coord.left,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {items &&
                items.map(({ onClick, display, delemeterBefore }) => (
                  <div key={display}>
                    {delemeterBefore && <Delimeter />}
                    <div className={makeClassName('popover', 'item')} onClick={onClick}>
                      <Text>{display}</Text>
                    </div>
                  </div>
                ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export { Popover };

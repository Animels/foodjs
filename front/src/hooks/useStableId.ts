import { useMemo, useRef } from 'react';
import { generateId } from 'utils/generateId';

export const useStableId = (items: object[], cb: () => string): string[]=> {
  const idRef = useRef(null);

  return useMemo(() => {
    if (!idRef.current) {
      return items.map(() => generateId());
    }
    return idRef.current
  }, [items, cb]);
};

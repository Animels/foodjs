import { useMemo, useState } from 'react';

type RUseSearch<T> = {
  searchState: boolean;
  searchFail: string;
  searchRes: T[];
  setSearch: (newVal: string) => void;
};

export const useSearch = <T>(items: T[], key?: keyof T): RUseSearch<T> => {
  const [search, setSearch] = useState('');

  const vals = useMemo(() => {
    let res: T[];
    if (key) {
      res = items.filter((el) => String(el[key]).toLowerCase().includes(search.toLowerCase()));
    } else {
      res = items.filter((el) => (el as string).toLowerCase().includes(search.toLowerCase()));
    }
    return res;
  }, [items, search]);

  return {
    searchState: search !== '',
    searchFail: !vals.length ? `Nothing found for "${search}"` : '',
    searchRes: vals,
    setSearch,
  };
};

import { Button, Input, StateButton, Text } from '@components';
import { useSearch } from '@hooks';
import { makeClassName } from '@utils';
import { ChangeEvent, SyntheticEvent, memo, useCallback, useMemo, useState } from 'react';
import { SortOptions, useRestaurauntStore } from 'store';

import './component.css';

type SidebarBlockProps = {
  label: string;
  items: string[];
  type: 'radio' | 'round' | 'checkbox';
  filterBy: 'cusine' | 'sortBy' | 'price';
};

const SidebarBlock = ({ label, items, type, filterBy }: SidebarBlockProps) => {
  const updateFilters = useRestaurauntStore((state) => state.updateFilters);
  const filter = useRestaurauntStore((state) => state.filters.filters[filterBy]);
  const isLong = useMemo(() => items.length > 9, [items]);
  const [showFull, setShowFull] = useState(false);
  const { searchState, searchRes, searchFail, setSearch } = useSearch(items);

  const onClick = (e?: SyntheticEvent) => {
    if (!e) return;
    e.preventDefault();

    const filter = (e.currentTarget as HTMLElement).textContent;
    if (!filter) return;

    updateFilters(filterBy, filter as SortOptions);
  };

  const wrapElements = () => {
    if (searchFail) return <Text className={makeClassName('sidebar', 'text', { key: 'nothing-found' })}>{searchFail}</Text>;

    let newTems = searchRes;
    if (isLong && !showFull) newTems = items.slice(0, 10);

    return newTems.map((item, index) => {
      return <StateButton type={type} text={item} key={index} onClick={onClick} state={filter.includes(item)} />;
    });
  };

  const onShowFull = useCallback(() => {
    setShowFull(!showFull);
  }, [showFull]);

  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setShowFull(true);
  }, []);

  const onClear = useCallback(() => {
    setSearch('');
  }, []);

  return (
    <div className={makeClassName('sidebar', 'block')}>
      <Text>{label}</Text>
      {isLong && <Input placeholder="Search" onChange={onSearch} onClear={onClear} />}
      <div className={makeClassName('sidebar', 'row', { round: type === 'round' })}>
        {wrapElements()}
        {isLong && !searchState && (
          <Button fullWidth={true} onClick={onShowFull} variant="drop">
            Show {showFull ? 'Less' : 'Full'}
          </Button>
        )}
      </div>
    </div>
  );
};

const Memosied = memo(SidebarBlock);

export { Memosied as SidebarBlock };

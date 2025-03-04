import { Button, SidebarContainer, Text } from '@components';
import { makeClassName } from '@utils';
import { memo, useMemo } from 'react';
import { useRestaurauntStore } from 'store';

import './component.css';
import { SidebarBlock } from './components/block';

const Sidebar = () => {
  const categories = useRestaurauntStore((state) => state.filters.categories);
  const isActive = useRestaurauntStore((state) => state.filters.isActive);
  const resetFilters = useRestaurauntStore((state) => state.resetFilters);
  const sortingOptions = useMemo(() => ['Relevance', 'Delivery time', 'Alphabetically'], []);
  const priceOptions = ['Low', 'Mid', 'High'];

  return (
    <SidebarContainer>
      <div className={makeClassName('sidebar', 'heading')}>
        <Text>Filters</Text>
        {isActive && (
          <Button variant={'transparent'} size="s" onClick={resetFilters}>
            Clear all
          </Button>
        )}
      </div>

      <SidebarBlock filterBy={'sortBy'} label={'Sort By'} type="radio" items={sortingOptions}></SidebarBlock>

      <SidebarBlock filterBy={'cusine'} label={'Cuisines'} type="checkbox" items={categories}></SidebarBlock>

      <SidebarBlock filterBy={'price'} label={'Price'} type="round" items={priceOptions}></SidebarBlock>
    </SidebarContainer>
  );
};

const MemoedSideBar = memo(Sidebar);

export { MemoedSideBar as Sidebar };

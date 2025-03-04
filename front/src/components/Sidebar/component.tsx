import { makeClassName } from '@utils';
import { ReactNode, memo } from 'react';

import './component.css';

const SidebarContainer = ({ children }: { children: ReactNode }) => {
  return <aside className={makeClassName('sidebar')}>{children}</aside>;
};

const MemoedSideBar = memo(SidebarContainer);

export { MemoedSideBar as SidebarContainer };

import { makeClassName } from '@utils';
import { ReactElement } from 'react';

import './index.css';

type HeaderProps = {
  logoRenderrer?: () => ReactElement;
  bodyRenderrer?: () => ReactElement;
  actionRenderrer?: () => ReactElement;
  className?: string;
};

const Header = ({ logoRenderrer, bodyRenderrer, actionRenderrer, className }: HeaderProps) => {
  return (
    <div className={makeClassName('header', undefined, { mixin: className })}>
      <div className={makeClassName('header', 'logo')}>{logoRenderrer && logoRenderrer()}</div>
      <div className={makeClassName('header', 'body')}> {bodyRenderrer && bodyRenderrer()} </div>
      <div className={makeClassName('header', 'actions')}> {actionRenderrer && actionRenderrer()}</div>
    </div>
  );
};

export { Header };

import { makeClassName } from '@utils';
import { createElement, memo, ReactNode } from 'react';

import './component.css';

type TextProps = {
  type?: string;
  children: ReactNode
  className?: string;
};

const Text = ({ type = 'span', children, className }: TextProps) => {
  const Component = type;

  return (
    <div className={makeClassName('text-container', undefined, { mixin: className })}>
      {createElement(Component, {}, children)}
    </div>
  );
};

const Memoized = memo(Text);

export { Memoized as Text };

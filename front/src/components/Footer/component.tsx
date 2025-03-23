import { Text } from '@components/core';
import { makeClassName } from '@utils';

import './component.css';

const Footer = () => {
  return (
    <footer className={makeClassName('footer')}>
      <Text>Someinfo</Text>
    </footer>
  );
};

export { Footer };

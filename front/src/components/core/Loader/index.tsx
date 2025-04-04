import loaderImage from '@assets/loader.gif';
import { makeClassName } from '@utils';
import { createPortal } from 'react-dom';

import './idnex.css';

const Loader = () => {
  return createPortal(
    <div className={makeClassName('loader')}>
      <img src={loaderImage}></img>
    </div>,
    document.body
  );
};

export { Loader };

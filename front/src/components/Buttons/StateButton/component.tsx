import { makeClassName } from '@utils';
import { memo, SyntheticEvent } from 'react';

import './component.css';

type StateButtonprops = {
  type: 'radio' | 'round' | 'checkbox';
  text: string;
  onClick: (e?: SyntheticEvent) => void;
  state: boolean;
};

const StateButton = ({ type, text, onClick, state }: StateButtonprops) => {
  return (
    <div
      onClick={onClick}
      className={makeClassName('state-button', undefined, { round: type === 'round', checked: type === 'round' && state })}
    >
      <div className={makeClassName('state-button', 'inner-button', { key: type, checked: state })}></div>
      <div className={makeClassName('state-button', 'inner-text', { key: type, checked: state })}>{text}</div>
    </div>
  );
};

const Memoized = memo(StateButton)

export { Memoized as StateButton };

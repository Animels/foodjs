import { makeClassName } from '@utils';

import './index.css';

type SwitchProps = {
  state: boolean;
  onClick: () => void;
};

const Switch = ({ state, onClick }: SwitchProps) => {
  return (
    <div className={makeClassName('switch')} onClick={onClick}>
      <button className={makeClassName('switch', 'slider', { on: state })}></button>
    </div>
  );
};

export { Switch };

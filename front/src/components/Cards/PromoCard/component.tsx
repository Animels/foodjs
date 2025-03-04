import { makeClassName } from '@utils';

import './component.css';

type PromoCardProps = {
  previewImg: string;
  size?: 'sm' | 'l' | 'xl';
};

const PromoCard = ({ previewImg }: PromoCardProps) => {
  return (
    <div className={makeClassName('promo-card')}>
      <img className={makeClassName('promo-card', 'prev')} src={previewImg} />
    </div>
  );
};

export { PromoCard };

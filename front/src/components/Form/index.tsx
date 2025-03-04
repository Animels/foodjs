import { Button } from '@components';
import { makeClassName } from '@utils';
import { ReactElement, ReactNode, SyntheticEvent, cloneElement } from 'react';

import './index.css';

type FormProps = {
  bodyRenderrer: ReactNode;
  primaryActionRenderrer?: ReactElement;
  secondaryActionRenderrer?: ReactElement;
  actionsRenderrer?: ReactNode;
  formName?: string;
  className?: string;
  onNext?: () => void;
  onBack?: () => void;
};

const Form = ({
  bodyRenderrer,
  formName,
  primaryActionRenderrer,
  secondaryActionRenderrer = <Button variant="secondary">Back</Button>,
  actionsRenderrer,
  className,
  onNext,
  onBack,
}: FormProps) => {
  const primaryButton = () => {
    if (!primaryActionRenderrer) return null;

    const oldOnClick = primaryActionRenderrer.props.onClick;

    const combinedOnClick = (event: SyntheticEvent) => {
      if (oldOnClick) {
        oldOnClick(event);
      }
      if (onNext) {
        onNext();
      }
    };

    return cloneElement(primaryActionRenderrer, {
      onClick: combinedOnClick,
    });
  };

  const secondaryButton = () => {
    if (!secondaryActionRenderrer || !onBack) return null;

    const oldOnClick = secondaryActionRenderrer.props.onClick;

    const combinedOnClick = (event: SyntheticEvent) => {
      if (oldOnClick) {
        oldOnClick(event);
      }
      onBack();
    };

    return cloneElement(secondaryActionRenderrer, {
      onClick: combinedOnClick,
    });
  };

  return (
    <div className={makeClassName('form', undefined, { mixin: className })}>
      {formName && <div className={makeClassName('form', 'header')}>{formName}</div>}
      <div className={makeClassName('form', 'body')}>{bodyRenderrer}</div>
      <div className={makeClassName('form', 'footer')}>
        {primaryButton()}
        {actionsRenderrer}
        {secondaryButton()}
      </div>
    </div>
  );
};

export { Form };

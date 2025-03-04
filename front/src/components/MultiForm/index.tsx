import { useStepContext } from '@context';
import { Text } from '@components';
import { Children, ReactElement, ReactNode, cloneElement, isValidElement, useEffect } from 'react';

const MultiForm = ({ children, className, heading }: { children: ReactNode; className?: string; heading?: string }) => {
  const { stepState, isLastStep, setStepAmount } = useStepContext();
  const childs: ReactElement[] = Children.toArray(children).filter((child) => isValidElement(child));

  if (!stepState) throw 'MultiModal doesnt work ouside the step context';

  useEffect(() => {
    if (setStepAmount) setStepAmount(childs.length);
  }, [childs.length]);

  const cloneStep = () => {
    let props: { onBack?: () => void; onNext?: () => void } = {};
    if (stepState.step > 0) {
      props.onBack = () => {
        stepState.prev();
      };
    }
    if (!isLastStep) {
      props.onNext = () => {
        if (!isLastStep) stepState.next();
      };
    }

    return cloneElement(childs[stepState.step], props);
  };

  return (
    <div className={className}>
      {heading && <Text type="h1">{heading}</Text>}
      {cloneStep()}
    </div>
  );
};

export { MultiForm };

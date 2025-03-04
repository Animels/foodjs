import { stepState, useStepState } from '@hooks';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type IStepContext = {
  stepState: stepState | null;
  inModal: boolean | null;
  setInModal: ((any: boolean) => void) | null;
  isLastStep: boolean | null;
  stepAmount: number | null;
  setStepAmount: ((any: number) => void) | null;
};

const StepContext = createContext<IStepContext>({
  stepState: null,
  inModal: null,
  setInModal: null,
  isLastStep: null,
  stepAmount: null,
  setStepAmount: null,
});

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const stepState = useStepState(0);
  const [inModal, setInModal] = useState(false);
  const [isLastStep, setIsLastStep] = useState(false);
  const [stepAmount, setStepAmount] = useState(0);

  const oldReset = stepState.reset;
  stepState.reset = () => {
    setIsLastStep(false);
    oldReset();
  };

  useEffect(() => {
    if (stepAmount - 1 === stepState.step) {
      setIsLastStep(true);
    } else {
      setIsLastStep(false);
    }
  }, [stepState.step]);

  return (
    <StepContext.Provider value={{ stepState, inModal, setInModal, isLastStep, stepAmount, setStepAmount }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => useContext(StepContext);

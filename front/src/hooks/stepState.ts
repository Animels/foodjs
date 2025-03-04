import { useState } from "react";

export type stepState = {
  step: number;
  next: () => void;
  prev: () => void;
  reset: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const useStepState = (initialStep = 0) => {
  const [step, setStep] = useState(initialStep);
  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => Math.max(0, s - 1));
  const reset = () => setStep(initialStep);
  return { step, next, prev, reset, setStep };
};

import { useStepContext } from '@context';
import { Children, ReactElement, isValidElement, useEffect } from 'react';

import { Modal, ModalProps } from '../Modal';
import { FieldValues } from 'react-hook-form';

const MultiModal = <T extends FieldValues>({ children, onClose,  modalLabel, className, reset }: ModalProps<T>) => {
  const { stepState, setInModal } = useStepContext();
  const childs: ReactElement[] = Children.toArray(children).filter((child) => isValidElement(child));

  useEffect(() => {
    if (setInModal) setInModal(true);
  }, [])

  if (!stepState) throw 'MultiModal doesnt work ouside the step context';

  return (
    <Modal onClose={onClose}  modalLabel={modalLabel} className={className} reset={reset}>
      {childs.length === 1 ? childs[0] : childs[stepState.step]}
    </Modal>
  );
};

export { MultiModal };

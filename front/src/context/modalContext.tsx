import { ModalProps } from '@components/Modals/Modal/types';
import { ReactNode, createContext, createElement, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { FieldValues } from 'react-hook-form';

type IModal<T extends FieldValues = Record<string, unknown>> = {
  id: string;
  component?: (props: ModalProps<T>) => JSX.Element;
  props?: ModalProps<T>;
};

type IModalContext = {
  modals: IModal[];
  openModal: (modal: IModal) => void;
  closeModal: (id: string) => void;
  closeAll: () => void;
};

type IModalContextProps = {
  children: ReactNode;
};

const ModalContext = createContext<IModalContext>({
  modals: [],
  openModal: () => {},
  closeModal: () => {},
  closeAll: () => {},
});

const ModalProvider = ({ children }: IModalContextProps) => {
  const [modals, setModals] = useState<IModal[]>([]);

  const openModal = (modal: IModal) => setModals((prev) => (prev.some((mod) => mod.id === modal.id) ? prev : [...prev, modal]));
  const closeModal = (id: string) => setModals((prev) => prev.filter((modal) => modal.id !== id));
  const closeAll = () => setModals([]);

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal, closeAll }}>
      {children}
      {modals &&
        modals.map((modal) => {
          const root = document.querySelector(':root');
          let modalProps = {
            ...modal.props,
            onClose: () => closeModal(modal.id),
          };
          if (!root) return null;

          return createPortal(
            modal.component ? createElement(modal.component, modalProps as ModalProps) : <>Modal Holder</>,
            root
          );
        })}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Modal can not be used outside context');
  }
  return context;
};

export { ModalProvider, useModal };

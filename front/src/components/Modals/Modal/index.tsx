import { Header, Icon, Text } from '@components';
import { useStepContext } from '@context';
import { makeClassName } from '@utils';
import { ICON_TYPES } from 'components/Icon/types';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { FieldValues, UseFormReset } from 'react-hook-form';

import './index.css';

type ModalProps<T extends FieldValues> = {
  children: ReactNode;
  className?: string;
  onClose?: (any: boolean) => void;
  modalLabel?: string;
  reset?: UseFormReset<T>;
};

const Modal = <T extends FieldValues>({ onClose, children, modalLabel, className, reset }: ModalProps<T>) => {
  const { stepState } = useStepContext();

  return createPortal(
    <div className={makeClassName('modal')}>
      <div className={makeClassName('modal', 'container', { mixin: className })}>
        <Header
          className={makeClassName('modal', 'header')}
          logoRenderrer={() =>
            stepState?.step !== 0 ? <Icon icon={ICON_TYPES.ARROW_LEFT} size={'m'} onClick={() => stepState?.prev()} /> : <></>
          }
          bodyRenderrer={() => <>{modalLabel && <Text type={'h4'}>{modalLabel}</Text>}</>}
          actionRenderrer={() => (
            <>
              {onClose && (
                <Icon
                  icon={ICON_TYPES.X}
                  size={'s'}
                  onClick={() => {
                    onClose(false);
                    stepState?.reset();
                    if (reset) reset();
                  }}
                />
              )}
            </>
          )}
        ></Header>
        <div className={makeClassName('modal', 'body')}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export { Modal };
export type { ModalProps };

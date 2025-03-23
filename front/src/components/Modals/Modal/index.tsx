import { Header } from '@components/Header';
import { ICON_TYPES, Icon, Text } from '@components/core';
import { useStepContext } from '@context';
import { makeClassName } from '@utils';
import { createPortal } from 'react-dom';
import { FieldValues } from 'react-hook-form';

import './index.css';
import { ModalProps } from './types';

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

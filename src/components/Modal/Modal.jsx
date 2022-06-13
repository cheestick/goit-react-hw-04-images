import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default function Modal({ onClose, children }) {
  const onModalClose = useCallback(
    e => {
      (e.code === 'Escape' || e.currentTarget === e.target) && onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', onModalClose);
    return () => {
      window.removeEventListener('keydown', onModalClose);
    };
  }, [onModalClose]);

  return createPortal(
    <div className={s.overlay} onClick={onModalClose}>
      <div className={s.modal}>{children}</div>
    </div>,
    document.querySelector('#modal')
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

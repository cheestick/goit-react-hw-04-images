import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose);
  }

  onClose = e => {
    e.code === 'Escape' && this.props.onClose();
    e.currentTarget === e.target && this.props.onClose();
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.onClose}>
        <div className={s.modal}>
          <img src="" alt="" />
        </div>
      </div>,
      document.querySelector('#modal')
    );
  }
}

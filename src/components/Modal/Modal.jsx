import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose);
  }

  onClose = e => {
    (e.code === 'Escape' || e.currentTarget === e.target) &&
      this.props.onClose();
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.onClose}>
        <div className={s.modal}>{this.props.children}</div>
      </div>,
      document.querySelector('#modal')
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

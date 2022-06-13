import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ label, onClick }) {
  return (
    <button className={s.button} type="button" onClick={onClick}>
      {label || 'Load'}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

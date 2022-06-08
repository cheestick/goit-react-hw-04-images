import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

export default class Button extends Component {
  render() {
    return (
      <button className={s.button} type="button" onClick={this.props.onClick}>
        {this.props.label || 'Load'}
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

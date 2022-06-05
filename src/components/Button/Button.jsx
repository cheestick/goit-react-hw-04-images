import React, { Component } from 'react';
import s from './Button.module.css';

export default class Button extends Component {
  render() {
    return (
      <button className={s.button} type="button">
        {this.props.label}
      </button>
    );
  }
}

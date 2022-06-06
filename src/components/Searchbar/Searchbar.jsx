import React, { Component } from 'react';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  onSubmit = e => {
    e.preventDefault();
    if (this.props.query.length < 1) return;
    console.log(this.props.query);
  };

  onChange = e => {
    this.props.updateQuery(e.target.value);
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.onSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            value={this.props.query}
            onChange={this.onChange}
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
          />
        </form>
      </header>
    );
  }
}

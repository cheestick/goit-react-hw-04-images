import React, { Component } from 'react';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  onSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    if (query.length < 1) return;
    this.props.onSearchImage(query);
  };

  onChange = e => {
    this.setState({ query: e.target.value });
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
            value={this.state.query}
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

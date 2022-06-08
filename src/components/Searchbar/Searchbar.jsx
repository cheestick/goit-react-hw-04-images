import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  onSubmit = e => {
    e.preventDefault();
    const query = this.state.query.trim();
    if (query.length < 1) return;
    this.props.onSubmit(query);
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

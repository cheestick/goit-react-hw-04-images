import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 1) return;

    onSubmit(trimmedQuery);
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={onFormSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          value={query}
          onChange={({ target: { value } }) => setQuery(value)}
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

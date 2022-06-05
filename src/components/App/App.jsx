import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import s from './App.module.css';

export default class App extends Component {
  render() {
    return (
      <div className={s.App}>
        <Searchbar
          onSubmit={e => {
            e.preventDefault();
          }}
        />
        <ImageGallery />
        <Loader />
        <Button label="Load More" />
      </div>
    );
  }
}

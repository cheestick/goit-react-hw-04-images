import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import s from './App.module.css';

export default class App extends Component {
  state = {
    result: [],
    showModal: false,
    isLoading: false,
  };

  componentDidUpdate() {
    console.log('App updated');
  }

  onSearchImage = query => {
    console.log('App onSearchImage ', query);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { result, showModal, isLoading } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSearchImage={this.onSearchImage} />
        <ImageGallery result={result} showModal={this.toggleModal} />
        {result.length > 0 && <Button label="Load More" />}
        {isLoading && <Loader />}
        {showModal && <Modal onClose={this.toggleModal} />}
      </div>
    );
  }
}

import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import s from './App.module.css';

export default class App extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar
          onSubmit={e => {
            e.preventDefault();
          }}
        />
        <ImageGallery showModal={this.toggleModal} />
        <Loader />
        {this.state.showModal && <Modal onClose={this.toggleModal} />}
        <Button label="Load More" />
      </div>
    );
  }
}

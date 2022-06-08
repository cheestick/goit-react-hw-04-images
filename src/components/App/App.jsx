import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';

import s from './App.module.css';

export default class App extends Component {
  state = {
    query: '',
    showModal: false,
  };

  onSubmit = query => {
    if (this.state.query === query) return;
    this.setState({ query });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  showModal = entity => {
    this.modalEntity = entity;
    this.toggleModal();
  };

  render() {
    const { query, showModal } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery query={query} onClick={this.showModal} />
        {showModal && (
          <Modal onClose={this.toggleModal}>{this.modalEntity} </Modal>
        )}
      </div>
    );
  }
}

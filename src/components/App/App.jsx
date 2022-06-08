import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
// import Modal from 'components/Modal';
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

  render() {
    const { query } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery query={query} showModal={this.toggleModal} />
      </div>
    );
  }
}

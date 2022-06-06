import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import s from './App.module.css';

export default class App extends Component {
  state = {
    query: '',
    result: [],
    showModal: false,
    isLoading: false,
  };

  updateQuery = newQuery => {
    this.setState({ query: newQuery });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { query, result, showModal, isLoading } = this.state;
    return (
      <div className={s.App}>
        <Searchbar query={query} updateQuery={this.updateQuery} />
        <ImageGallery result={result} showModal={this.toggleModal} />
        {result.length > 0 && <Button label="Load More" />}
        {isLoading && <Loader />}
        {showModal && <Modal onClose={this.toggleModal} />}
      </div>
    );
  }
}

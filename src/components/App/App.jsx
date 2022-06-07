import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
// import Button from 'components/Button';
// import Loader from 'components/Loader';
// import Modal from 'components/Modal';
import s from './App.module.css';

export default class App extends Component {
  state = {
    query: '',
    showModal: false,
  };

  onSubmit = query => {
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
        {/* {!this.lastPage && result.length > 0 && (
          <Button
            onClick={() => this.onSearchImage(this.state.currentQuery)}
            label="Load More"
          />
        )}
        {showModal && <Modal onClose={this.toggleModal} />} */}
      </div>
    );
  }
}

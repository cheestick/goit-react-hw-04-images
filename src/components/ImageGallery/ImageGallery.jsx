import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import s from './ImageGallery.module.css';
import * as api from 'services/search-api';
import { smoothScroll } from 'Utils';

export default class ImageGallery extends Component {
  state = {
    result: [],
    status: null,
    lastPage: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const { status, lastPage } = this.state;

    prevQuery !== nextQuery && this.setNewQueryStatus();

    if (status === 'new') {
      this.loading();
      this.updateGalleryState(nextQuery);
    }

    if (prevState.status === 'more' && status === 'loading' && !lastPage) {
      this.updateGalleryState(nextQuery);
    }
  }

  updateGalleryState = async query => {
    const moreResult = await api.fetchMoreImages(query);
    this.setState(
      prevState => ({
        result: [...prevState.result, ...moreResult.result],
        status: 'more',
        lastPage: moreResult.lastPage,
      }),
      smoothScroll
    );
  };

  loading = () => {
    this.setState({ status: 'loading' });
  };

  setNewQueryStatus = () => {
    this.setState({
      status: 'new',
      result: [],
      lastPage: false,
    });
  };

  onClick = e => {
    const { nodeName, dataset, alt } = e.target;
    if (nodeName === 'IMG') {
      const largeImage = <img src={dataset.largeImageUrl} alt={alt} />;
      this.props.onClick(largeImage);
    }
  };

  render() {
    const { result, status, lastPage } = this.state;

    return (
      <>
        <ul className={s.gallery} onClick={this.onClick}>
          {result.map(galleryItemData => (
            <ImageGalleryItem key={galleryItemData.id} data={galleryItemData} />
          ))}
        </ul>
        {status === 'loading' && <Loader />}
        {!lastPage && status === 'more' && (
          <Button label="Load More" onClick={this.loading} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

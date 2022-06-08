import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import s from './ImageGallery.module.css';
import * as api from 'services/search-api';
import { smoothScroll } from 'Utils';

class ImageGallery extends Component {
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
      this.loadMore();
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

  loadMore = () => {
    this.setState({ status: 'loading' });
  };

  setNewQueryStatus = () => {
    this.setState({
      status: 'new',
      result: [],
    });
  };

  render() {
    const { result, status, lastPage } = this.state;
    const { showModal } = this.props;

    return (
      <>
        <ul className={s.gallery}>
          {result.map(galleryItemData => (
            <ImageGalleryItem
              key={galleryItemData.id}
              data={galleryItemData}
              showModal={showModal}
            />
          ))}
        </ul>
        {status === 'loading' && <Loader />}
        {!lastPage && status === 'more' && (
          <Button label="Load More" onClick={this.loadMore} />
        )}
      </>
    );
  }
}

export default ImageGallery;

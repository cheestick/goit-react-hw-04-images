import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import s from './ImageGallery.module.css';
import * as api from 'services/search-api';
import { smoothScroll } from 'Utils';

class ImageGallery extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      status: null,
      lastPage: false,
    };

    // this.page = null;
  }

  async componentDidUpdate(prevProps, prevState) {
    // console.count('Did Update: ');
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const { status, lastPage } = this.state;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'new' });
      console.log('new');
    }

    if (status === 'new') {
      console.log('First');
      this.setState({
        status: 'loading',
      });
      const moreResult = await api.fetchMoreImages(nextQuery);
      this.setState(
        {
          result: [...moreResult.result],
          status: 'more',
          lastPage: moreResult.lastPage,
        },
        smoothScroll
      );
      return;
    }

    if (prevState.status === 'more' && status === 'loading' && !lastPage) {
      console.log('Load More');
      this.updateGallery(nextQuery);
    }
  }

  updateGallery = async query => {
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

import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import s from './ImageGallery.module.css';
import * as api from 'services/search-api';

class ImageGallery extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      status: 'idle',
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    // const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    console.count('Did Update: ');

    if (prevState.status === 'idle') {
      this.setState({ status: 'loading' });
      const data = await api.fetchMoreImages(nextQuery);
      this.setState(prevState => ({
        result: [...prevState.result, ...data.hits],
        status: 'more',
      }));
    }

    // if (prevQuery === nextQuery) {
    //   const { query } = this.props;
    //   this.setState({ status: 'loading' });
    //   const moreResult = await api.fetchImages(query, this.page);
    //   this.setState(
    //     prevState => ({
    //       result: [...prevState.result, ...moreResult.hits],
    //       status: 'more',
    //     }),
    //     this.smoothScroll
    //   );
    //   return;
    // }

    // if (prevState.status === this.state.status) return;
    // this.setState({ status: 'loading' });
    // const searchResult = await api.fetchImages(nextQuery, this.page);
    // this.setState(
    //   prevState => ({
    //     result: [...prevState.result, ...searchResult.hits],
    //     status: 'more',
    //   }),
    //   this.smoothScroll
    // );
  }

  loadMore = () => {
    this.setState({ status: 'loading' });
  };

  smoothScroll = () => {
    window.scrollBy({
      top: document.documentElement.clientHeight * this.page,
      behavior: 'smooth',
    });
  };

  render() {
    const { result, status } = this.state;
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
        {status === 'more' && (
          <Button label="Load More" onClick={this.loadMore} />
        )}
      </>
    );
  }
}

export default ImageGallery;

import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import s from './ImageGallery.module.css';
import * as api from 'services/search-api';

class ImageGallery extends Component {
  state = {
    result: [],
    status: 'idle',
  };

  async componentDidUpdate(prevProps, _) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery === nextQuery) return;

    this.setState({ status: 'loading' });

    const searchResult = await api.fetchImages(nextQuery);
    this.setState({
      result: searchResult.hits,
      status: 'resolve',
    });
    this.page = 2;
  }

  loadMore = async () => {
    const { query } = this.props;
    // this.setState({ status: 'loading' });
    const moreResult = await api.fetchImages(query, this.page);
    this.page += 1;
    this.setState(
      prevState => ({
        result: [...prevState.result, ...moreResult.hits],
        // status: 'resolve',
      }),
      () => {
        window.scrollBy({
          top: document.documentElement.clientHeight * this.page,
          behavior: 'smooth',
        });
      }
    );
  };

  render() {
    const { result, status } = this.state;
    const { showModal } = this.props;

    if (status === 'idle') return null;

    if (status === 'loading') return <Loader />;

    if (status === 'resolve')
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
          <Button label="Load More" onClick={this.loadMore} />
        </>
      );
  }
}

export default ImageGallery;

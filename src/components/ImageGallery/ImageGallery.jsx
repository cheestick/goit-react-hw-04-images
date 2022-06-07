import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
// import Button from 'components/Button';
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
  }

  render() {
    const { result, status } = this.state;
    const { showModal } = this.props;

    if (status === 'idle') return null;

    if (status === 'loading') return <Loader />;

    if (status === 'resolve')
      return (
        <ul className={s.gallery}>
          {result.map(galleryItemData => (
            <ImageGalleryItem
              key={galleryItemData.id}
              data={galleryItemData}
              showModal={showModal}
            />
          ))}
        </ul>
      );
  }
}

export default ImageGallery;

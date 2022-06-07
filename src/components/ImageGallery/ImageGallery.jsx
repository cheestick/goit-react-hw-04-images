import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
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

    const searchResult = await api.fetchImages(nextQuery);
    this.setState({ result: searchResult.hits });
  }

  render() {
    const { result } = this.state;
    const { showModal } = this.props;
    const gallery = (
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
    return gallery;
  }
}

export default ImageGallery;

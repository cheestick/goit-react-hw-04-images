import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => {
  const { id, webformatURL, largeImageURL } = props.data;

  return (
    <li className={s.item}>
      <img
        className={s.image}
        src={webformatURL}
        data-large-image-url={largeImageURL}
        alt={id}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;

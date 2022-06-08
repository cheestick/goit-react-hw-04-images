import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => {
  const { id, webformatURL, largeImageURL } = props.data;
  // console.log(id);
  return (
    <li className={s.item} onClick={props.showModal}>
      <img
        className={s.image}
        src={webformatURL}
        data-large-image-url={largeImageURL}
        alt={id}
      />
    </li>
  );
};

export default ImageGalleryItem;

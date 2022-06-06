import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = props => (
  <ul className={s.gallery}>
    <ImageGalleryItem showModal={props.showModal} />
  </ul>
);

export default ImageGallery;

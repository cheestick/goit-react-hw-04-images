import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = () => (
  <ul className={s.gallery}>
    <ImageGalleryItem />
  </ul>
);

export default ImageGallery;

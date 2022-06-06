import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = props => {
  const { result, showModal } = props;
  const gallery = result.length > 0 && (
    <ul className={s.gallery}>
      {result.map(galleryItemData => (
        <ImageGalleryItem data={galleryItemData} showModal={showModal} />
      ))}
    </ul>
  );
  return gallery;
};

export default ImageGallery;

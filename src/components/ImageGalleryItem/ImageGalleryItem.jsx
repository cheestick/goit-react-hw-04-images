import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => (
  <li className={s.item}>
    <img className={s.image} src="" alt="" />
  </li>
);

export default ImageGalleryItem;

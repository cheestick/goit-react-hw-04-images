import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import s from './ImageGallery.module.css';
import * as api from 'services/search-api';
import { smoothScroll } from 'Utils';

const STATUS = {
  NEW: 'new',
  LOADING: 'loading',
  MORE: 'more',
  IDLE: 'idle',
};

export default function ImageGallery({ query, onClick }) {
  const [status, setStatus] = useState(STATUS.IDLE);
  const result = useRef([]);
  const lastPage = useRef(false);
  const prevQuery = useRef(null);

  const setNewQueryStatus = useCallback(() => {
    prevQuery.current = query;
    result.current = [];
    lastPage.current = false;
    setStatus(STATUS.NEW);
  }, [query]);

  useEffect(() => {
    if (!query) return;
    if (prevQuery.current !== query) {
      prevQuery.current = query;
      setNewQueryStatus();
    }

    if (status === STATUS.NEW) updateGalleryState(query);
    smoothScroll();
  }, [query, status, setNewQueryStatus]);

  async function updateGalleryState(query) {
    setStatus(STATUS.LOADING);
    const moreResult = await api.fetchMoreImages(query);
    result.current = [...result.current, ...moreResult.result];
    lastPage.current = moreResult.lastPage;
    setStatus(STATUS.MORE);
  }

  const onImageClick = e => {
    const { nodeName, dataset, alt } = e.target;
    if (nodeName === 'IMG') {
      const largeImage = <img src={dataset.largeImageUrl} alt={alt} />;
      onClick(largeImage);
    }
  };

  return (
    <>
      <ul className={s.gallery} onClick={onImageClick}>
        {result.current.map(galleryItemData => (
          <ImageGalleryItem key={galleryItemData.id} data={galleryItemData} />
        ))}
      </ul>
      {status === STATUS.LOADING && <Loader />}
      {!lastPage.current && status === STATUS.MORE && (
        <Button label="Load More" onClick={() => updateGalleryState(query)} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

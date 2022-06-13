import React, { useState, useEffect, useRef } from 'react';
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
};

export default function ImageGallery({ query, onClick }) {
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(null);
  const [lastPage, setLastPage] = useState(false);
  const prevQuery = useRef('');
  const prevStatus = useRef('');

  // async componentDidUpdate(prevProps, prevState) {
  //   const prevQuery = prevProps.query;
  //   const nextQuery = this.props.query;
  //   const { status, lastPage } = this.state;

  //   prevQuery !== nextQuery && this.setNewQueryStatus();

  //   if (status === 'new') {
  //     this.loading();
  //     this.updateGalleryState(nextQuery);
  //   }

  //   if (prevState.status === 'more' && status === 'loading' && !lastPage) {
  //     this.updateGalleryState(nextQuery);
  //   }
  // }

  // useEffect(() => {
  //   setNewQueryStatus();
  // }, [query]);

  useEffect(() => {
    if (prevQuery.current !== query) {
      prevQuery.current = query;
      prevStatus.current = status;
      setNewQueryStatus();
    }
  }, [query, status]);

  useEffect(() => {
    if (status === STATUS.NEW) {
      prevStatus.current = status;
      setStatus(STATUS.LOADING);
      updateGalleryState(query);
    }
  }, [query, status]);

  useEffect(() => {
    if (
      (!lastPage &&
        status === STATUS.LOADING &&
        prevStatus.current === STATUS.LOADING) ||
      prevStatus.current === STATUS.NEW
    ) {
      prevStatus.current = status;
      updateGalleryState(query);
    }
  }, [status, lastPage, query]);

  async function updateGalleryState(query) {
    const moreResult = await api.fetchMoreImages(query);
    setResult(prevResult => [...prevResult, ...moreResult.result]);
    setLastPage(moreResult.lastPage);
    setStatus(STATUS.MORE);
    smoothScroll();
  }

  function setNewQueryStatus() {
    setStatus(STATUS.NEW);
    setResult([]);
    setLastPage(false);
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
        {result.map(galleryItemData => (
          <ImageGalleryItem key={galleryItemData.id} data={galleryItemData} />
        ))}
      </ul>
      {status === STATUS.LOADING && <Loader />}
      {!lastPage && status === STATUS.MORE && (
        <Button label="Load More" onClick={() => setStatus(STATUS.LOADING)} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

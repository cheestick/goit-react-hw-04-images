import React, { useState, useRef } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';

import s from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const modalEntity = useRef(null);

  const onSubmit = newQuery => {
    if (query === newQuery) return;
    setQuery(newQuery);
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const onShowModal = entity => {
    modalEntity.current = entity;
    toggleModal();
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery query={query} onClick={onShowModal} />
      {showModal && <Modal onClose={toggleModal}>{modalEntity.current} </Modal>}
    </div>
  );
}

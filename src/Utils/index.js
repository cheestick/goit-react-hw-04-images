export const smoothScroll = () => {
  window.scrollBy({
    top: document.body.getBoundingClientRect().height,
    behavior: 'smooth',
  });
};

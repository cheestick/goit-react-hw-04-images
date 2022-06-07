const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '26837545-22abd047bbfdb35dbd690db9c';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const PER_PAGE = 12;

const initialQueryParams = {
  key: API_KEY,
  per_page: PER_PAGE,
  image_type: IMAGE_TYPE,
  orientation: ORIENTATION,
};

export const fetchImages = async (query = '', page = 1) => {
  const searchParams = new URLSearchParams({
    ...initialQueryParams,
    q: query,
    page,
  });

  const response = await fetch(`${BASE_URL}?${searchParams}`);
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error(`${query} response is not OK!`));
};

const currentQuery = {
  query: '',
  page: 0,
  totalPages: null,
  lastFetch: false,
};

export const fetchMoreImages = async query => {
  !isNewQuery(query) && !isLastPage() && increasePageNumber();
  isNewQuery(query) && initWithNewQuery(query);
  isLastPage() && setLastFetch();
  if (isLastFetch()) return [];

  const data = await fetchImages(query, currentQuery.page);
  nullishTotalPages() && setTotalPageCount(data.totalHits);

  return data;
};

const initWithNewQuery = query => {
  currentQuery.query = query;
  currentQuery.page = 1;
  currentQuery.totalPages = null;
  currentQuery.lastFetch = false;
};

const increasePageNumber = () => (currentQuery.page += 1);
const setTotalPageCount = totalHits => {
  currentQuery.totalPages = Math.ceil(totalHits / PER_PAGE);
};

const setLastFetch = () => (currentQuery.lastFetch = true);
const nullishTotalPages = () => currentQuery.totalPages === null;
const isLastFetch = () => currentQuery.lastFetch;
const isNewQuery = newQuery => currentQuery.query !== newQuery;
const isLastPage = () => (currentQuery.totalPages ?? 0) >= currentQuery.page;

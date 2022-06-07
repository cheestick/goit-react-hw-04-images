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

const queryData = {
  query: '',
  page: 1,
  totalHits: 0,
  lastPage: false,
};

export const fetchImages = async (query = '', page = 1) => {
  const searchParams = new URLSearchParams({
    ...initialQueryParams,
    q: query,
    page,
  });

  try {
    const response = await fetch(`${BASE_URL}?${searchParams}`);
    const data = response.json();
    if (!response.ok) {
      throw new Error('Response is not OK!');
    }
    return data;
  } catch (err) {
    return err.message;
  }
};

export const loadMoreImages = async query => {
  let data = null;

  if (isNewQuery(query)) {
    data = await fetchImages(query);
    initNewQueryData(query, data);
  } else {
    updateNextQueryPage();
    if (queryData.lastPage) return null;
    data = await fetchImages(queryData.query, queryData.page);
  }

  const galleryData = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
    id,
    webformatURL,
    largeImageURL,
  }));

  console.log('api', galleryData);
  console.log('last page: ', queryData.lastPage);
  return { data: galleryData, lastPage: queryData.lastPage };
};

const initNewQueryData = (query, data) => {
  queryData.query = query;
  queryData.page = 1;
  queryData.totalHits = data.totalHits;
  queryData.lastPage = hasNextPage() ? false : true;
  console.log('query data', queryData);
};

const updateNextQueryPage = () => {
  if (hasNextPage()) {
    queryData.page += 1;
    return;
  }

  queryData.lastPage = true;
};

const isNewQuery = query => queryData.query !== query;

const hasNextPage = () =>
  queryData.page * PER_PAGE <= queryData.totalHits - PER_PAGE;

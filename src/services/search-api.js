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

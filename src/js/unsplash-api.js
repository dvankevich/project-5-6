import axios from 'axios';

/**
 *
 * @param {string} query
 * @returns images list
 */
export async function getPhotos(query) {
  const BASE_URL = 'https://api.unsplash.com';
  const API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  const API_ENDPOINT = '/search/photos';

  try {
    const response = await axios.get(`${BASE_URL}${API_ENDPOINT}`, {
      params: {
        query,
        per_page: 12,
        orientation: 'portrait',
        client_id: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

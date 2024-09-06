import axios from 'axios';
import { API_URL_BASE, API_KEY } from '@src/api/apiConfig';

// general purpose apiFetching helper function
// doesn't use const, arrow to be "hoisted" and used before defined, and for simpler task
async function apiFetch(directory, params) {
  if (!params.length) return;
  try {
    const response = await axios.get(`${API_URL_BASE}${directory}`, {
      params: {
        api_key: API_KEY,
        ...params // spread operator is powerful - consolidate anything needed into obj to simplify code
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching MBTA data: ${error}`);
    throw error;
  }
}

export default apiFetch;

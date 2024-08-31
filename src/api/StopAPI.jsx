

import axios from 'axios';
import { API_URL_BASE, API_KEY} from './apiConfig';

export const StopAPI = async (stopId) => {
    try {
      const response = await axios.get(`${API_URL_BASE}/stops/${stopId}`, {
        params: {
          api_key: API_KEY,
        }
      });
      console.log("stopAPI", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching predictions:", error);
      throw error;
    }
  };
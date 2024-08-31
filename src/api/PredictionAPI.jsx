"use client";
import axios from 'axios';
import { API_URL_BASE, API_KEY} from './apiConfig';


// "blandford st. green line -> Park Street & North" stop has id='70148'

export const PredictionAPI = async (stopId) => {
  try {
    const response = await axios.get(`${API_URL_BASE}/predictions`, {
      params: {
        api_key: API_KEY,
        "filter[stop]": stopId,
        include: 'route',
      }
    });
    console.log("prediction response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching predictions:", error);
    throw error;
  }
};


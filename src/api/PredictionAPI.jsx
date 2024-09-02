"use client";
import axios from 'axios';
import { API_URL_BASE, API_KEY } from './apiConfig';


// "blandford st. green line -> Park Street & North" stop has id='70148'

// NOT fetching with onEffect!
export const PredictionAPI = async (stopId) => {  // will need id for prediction - get it from stopAPI
  try {
    const response = await axios.get(`${API_URL_BASE}/predictions`, {
      params: {
        api_key: API_KEY,
        "filter[stop]": stopId,
        //include: 'route',
      }
    });
    console.log("prediction (PredictionAPI)", response);          // not logging??
    return response.data.data;
  } catch (error) {
    console.error("Error fetching predictions:", error);
    throw error;
  }
};

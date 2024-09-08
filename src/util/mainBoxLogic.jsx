// logic for everything in a mainbox

'use client';

import { useState, useEffect, useContext } from 'react';
import { StopContext } from './StopProvider';
import { apiFetch } from './apiLogic';

// name doesn't need to be fetched => uses selectedStop obj instead of fetching
// mainbox top text
export const getCommuteName = () => {
  const { selectedStop } = useContext(StopContext);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (selectedStop && selectedStop.description) setDescription(selectedStop.description);
  }, [selectedStop]);

  return description;
};

// returns each vehicle - helper for getCommutePrediction
export const getVehicleInfo = async (vehicleId) => {
  const params = {
    'filter[id]': vehicleId
  };

  try {
    const vehicleResponse = await apiFetch('/vehicles', params);
    console.log('getVehicleInfo: vehicleResponse', vehicleResponse);
    return vehicleResponse;
  } catch (error) {
    console.error('Error fetching vehicle info:', error);
    throw error;
  }
};

// returns array of obj containing prediction and vehicle fields
export const getCommutePrediction = () => {
  const { selectedStop } = useContext(StopContext);
  console.log('selectedStop: ', selectedStop);
  const [prediction, setPrediction] = useState([]);

  const fetchPrediction = async () => {
    const params = {
      'filter[stop]': selectedStop.id
    };
    try {
      const predictionResponse = await apiFetch('/predictions', params);

      console.log('getCommutePrediction: response', predictionResponse);

      const predictionsWithVehicles = await Promise.all(
        predictionResponse.data.data.slice(0, 3).map(async (pred) => {
          const vehicleData = pred.relationships.vehicle.data;
          const vehicleId = vehicleData && vehicleData.id;

          let vehicleInfo = null;
          if (vehicleId) {
            vehicleInfo = await getVehicleInfo(vehicleId);
          }

          return {
            ...pred,
            vehicleInfo
          };
        })
      );

      console.log('getCommutePrediction: predictionsWithVehicles', predictionsWithVehicles);
      setPrediction(predictionsWithVehicles);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  useEffect(() => {
    fetchPrediction();

    const intervalId = setInterval(fetchPrediction, 10000); // Polling every 10 seconds
    return () => clearInterval(intervalId);
  }, [selectedStop]);

  console.log('mainBoxLogic: prediction', prediction);

  //return prediction;
  //predictionLogic(prediction);

  //if (!prediction || !prediction.length) return [];

  const predictionFiltered = prediction
    .filter((pred) => {
      var t = new Date();
      var currentTime = t.toLocaleTimeString();

      const vehicleStopId = pred.vehicleInfo.data.data[0].relationships.stop.data.id;
      const vehicleCurrentStatus = pred.vehicleInfo.data.data[0].attributes.current_status;

      console.log('vehiclestopid:', vehicleStopId);
      const arrivalTime = pred.attributes.arrival_time.substring(11, 19);

      // if ETA has passed rm
      if (currentTime < arrivalTime) {
        console.log('HIT');
      }
    })
    .slice(0, 3);

  console.log('mainBoxLogic: predictionFiltered', predictionFiltered);
  return predictionFiltered;
};

// further filters prediction+vehicle for rendering
export const predictionLogic = (prediction) => {
  const { selectedStop } = useContext(StopContext);

  // if (!prediction || !prediction.length) return [];

  // const predictionFiltered = prediction
  //   .filter((pred) => {
  //     var t = new Date();
  //     var currentTime = t.toLocaleTimeString();

  //     const vehicleStopId = pred.vehicleInfo.data.data[0].relationships.stop.data.id;
  //     const vehicleCurrentStatus = pred.vehicleInfo.data.data[0].attributes.current_status;

  //     console.log('vehiclestopid:', vehicleStopId);
  //     const arrivalTime = pred.attributes.arrival_time.substring(11, 19);

  //     // if ETA has passed rm
  //     if (currentTime > arrivalTime) return false;
  //   })
  //   .slice(0, 3);

  // return predictionFiltered;
};

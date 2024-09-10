// logic for everything in a mainbox

'use client';

import { useState, useEffect, useContext } from 'react';
import { StopContext } from './StopProvider';
import { apiFetch } from './apiLogic';
import { DateTime } from 'luxon';

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
        predictionResponse.data.data.map(async (pred) => {
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

  console.log('mainBoxLogic: prediction', prediction); // all available predictions + vehicleInfo for the selectedStop

  if (!prediction || !prediction.length) {
    console.log('returning []');
    return [];
  }
  const predictionFiltered = prediction
    .filter((pred) => {
      const format = 'HH:mm:ss';
      const vehicleStopId = pred.vehicleInfo?.data?.data[0]?.relationships?.stop?.data?.id;
      const vehicleCurrentStatus = pred.vehicleInfo?.data?.data[0]?.attributes?.current_status;

      const currentTime = DateTime.local();

      const arr = pred?.attributes?.arrival_time?.substring(11, 19);
      const arrivalTime = DateTime.fromFormat(arr, 'HH:mm:ss', { zone: 'local' });

      // if departing from selectedStop, rm
      if (vehicleCurrentStatus === 'DEPARTING' && vehicleStopId === selectedStop.id) return false;

      // if ETA has passed significantly , rm
      if (
        currentTime.toFormat(format) > arrivalTime.toFormat(format) &&
        currentTime.diff(arrivalTime, 'minutes') > 1 // remove conservatively for now
      ) {
        console.log(currentTime.toFormat(format), '>', arrivalTime.toFormat(format));
        return false;
      } else console.log(currentTime.toFormat(format), '<', arrivalTime.toFormat(format));

      return true;
    })
    .slice(0, 3)
    .map((pred) => {
      // status supercedes prediction time
      const vehicleStopId = pred.vehicleInfo?.data?.data[0]?.relationships?.stop?.data?.id;
      const vehicleCurrentStatus = pred.vehicleInfo?.data?.data[0]?.attributes?.current_status;
      console.log(vehicleCurrentStatus);

      if (vehicleStopId === selectedStop.id && vehicleCurrentStatus === 'INCOMING_AT') {
        return 'Arriving soon';
      }
      if (vehicleStopId === selectedStop.id && vehicleCurrentStatus === 'STOPPED_AT') {
        return 'Now boarding';
      }

      return pred.attributes.arrival_time.toString().substring(11, 16);
    });

  console.log('mainBoxLogic: predictionFiltered', predictionFiltered);
  return predictionFiltered;
};

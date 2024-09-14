// logic for everything in a mainbox

'use client';

import { useState, useEffect, useContext } from 'react';
import { StopContext } from './StopProvider';
import { apiFetch } from './apiLogic';
import { DateTime, Interval } from 'luxon';
import _ from 'lodash'; // modular utilites, use _.get

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
  //const [status, setStatus] = useState([]); // use vehicle status as state machine input

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

    const intervalId = setInterval(fetchPrediction, 5000); // Polling every 5 seconds
    return () => clearInterval(intervalId);
  }, [selectedStop]);

  console.log('mainBoxLogic: prediction', prediction); // all available predictions + vehicleInfo for the selectedStop

  if (!prediction || !prediction.length) {
    console.log('returning []');
    return [];
  }

  const predictionFiltered = prediction

    // distill relevant information
    .map((pred) => {
      // using lodash - last argument is default
      const vehicleInfo = _.get(pred, 'vehicleInfo.data.data[0]', {});
      const vehicleStopId = _.get(vehicleInfo, 'relationships.stop.data.id', null);
      const currentStatus = _.get(vehicleInfo, 'attributes.current_status', null);

      const format = 'HH:mm:ss';
      const arrivalAtTime = _.get(pred, 'attributes.arrival_time', '')?.substring(11, 19) || '';
      const arrivalAtTimeDT = DateTime?.fromFormat(arrivalAtTime, format, { zone: 'local' });
      const arrivalIn = arrivalAtTimeDT?.diffNow()?.toFormat('m') + ' min';

      return {
        vehicleStopId: vehicleStopId,
        currentStatus: currentStatus,
        arrivalAtTime: arrivalAtTime,
        arrivalAtTimeDT: arrivalAtTimeDT,
        arrivalIn: arrivalIn,
        format: format
      };
    })

    // remove bad predictions
    .filter((pred) => {
      // if relevant field missing, rm
      //console.log('pred:', pred);

      // const falsyValue = Object.values(pred).find((val) => !val);
      // if (falsyValue) {
      //   console.log('Falsiest value FOUND:', falsyValue);
      // }

      // if relevant fields missing or broken, rm prediction
      if (Object.values(pred).some((val) => !val)) return false;

      // if passed, passed = how long ago prediction was. otherwise, invalid interval
      const passed = Interval?.fromDateTimes(pred.arrivalAtTimeDT, DateTime.now());
      //if (Interval.isInterval(passed)) console.log('PASSED', passed.length);

      // if departing from selectedStop, rm
      if (pred.currentStatus === 'DEPARTING' && pred.vehicleStopId === selectedStop.id)
        return false;

      // if ETA has passed significantly, AND if its not stopped at selectedStop, rm
      if (
        Interval.isInterval(passed) &&
        passed.length('seconds') > 10 // remove conservatively for now
      ) {
        if (
          pred.currentStatus != 'STOPPED_AT' &&
          pred.stop_sequence != selectedStop.stop_sequence
        ) {
          console.log('Old prediction hit');
          return false;
        } else if (passed.length('seconds') > 30) return false;
      }

      return true;
    })

    // limit # predictions to 3
    .slice(0, 3)

    // format for display
    .map((pred) => {
      // status supercedes prediction time
      // const vehicleStopId = pred.vehicleStopId;
      // const currentStatus = pred.currentStatus;

      var newStatus = '';

      if (pred.vehicleStopId === selectedStop.id && pred.currentStatus === 'INCOMING_AT') {
        newStatus = 'Arriving...';
      } else if (pred.vehicleStopId === selectedStop.id && pred.currentStatus === 'STOPPED_AT') {
        newStatus = 'Now boarding';
      } else newStatus = '';

      return {
        arrivalAtTime: pred.arrivalAtTime.substring(0, 5),
        vehicleStopId: pred.vehicleStopId,
        currentStatus: newStatus,
        arrivalIn: pred.arrivalIn
      };
    });

  console.log('mainBoxLogic: predictionFiltered', predictionFiltered);
  return predictionFiltered;
};

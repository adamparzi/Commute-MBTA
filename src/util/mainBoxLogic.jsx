// logic for everything in a mainbox

'use client';

import { useState, useEffect, useContext } from 'react';
import { StopContext } from './StopProvider';
import { apiFetch } from './apiLogic';
import { DateTime, Interval } from 'luxon';
import _ from 'lodash'; // modular utilites, use _.get

// Uses selectedStop obj instead of fetching for box top text
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
  const [prediction, setPrediction] = useState([]);

  if (!selectedStop) return {};

  const fetchPrediction = async () => {
    const params = {
      'filter[stop]': selectedStop.id
    };
    try {
      const predictionResponse = await apiFetch('/predictions', params);
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
    // make sure there's an id to fetch prediction with
    // empty array is true for some reason - need to check if id exists
    if (selectedStop.id) {
      fetchPrediction();

      // Polling prediction every 5 seconds
      const intervalId = setInterval(fetchPrediction, 5000);
      return () => clearInterval(intervalId);
    }
  }, [selectedStop]);

  // more error checking
  if (!prediction || !prediction.length) {
    return [];
  }

  const predictionFiltered = prediction

    // distill relevant information
    .map((pred) => {
      // using lodash - last argument is default if something's N/A
      const vehicleInfo = _.get(pred, 'vehicleInfo.data.data[0]', {});
      const vehicleStopId = _.get(vehicleInfo, 'relationships.stop.data.id', null);
      const currentStatus = _.get(vehicleInfo, 'attributes.current_status', null);
      const vehicleLatitude = _.get(vehicleInfo, 'attributes.latitude', 0);
      const vehicleLongitude = _.get(vehicleInfo, 'attributes.longitude', 0);
      const bearing = _.get(vehicleInfo, 'attributes.bearing', 0);

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
        format: format,
        bearing: bearing,
        location: { vehicleLatitude, vehicleLongitude }
      };
    })
    // remove bad predictions
    .filter((pred) => {
      // if relevant fields missing or broken, rm prediction - IMPROVE
      if (Object.values(pred).some((val) => !val)) {
        return false;
      }

      // passed = how long ago prediction was. otherwise, invalid interval
      const passed = Interval?.fromDateTimes(pred.arrivalAtTimeDT, DateTime.now());

      // if departing from selectedStop, rm - most common conditional hit for valid vehicles
      if (pred.currentStatus === 'DEPARTING' && pred.vehicleStopId === selectedStop.id)
        return false;

      // if ETA has passed significantly, AND if vehicle not stopped at selectedStop, rm.
      // currently, gives a grace period of 30s if vehicle is boarding for that long
      // otherwise, rm prediction after 10s of having passed
      // consider using stop_sequence or global coords as a factor
      if (
        Interval.isInterval(passed) &&
        passed.length('seconds') > 10 // remove conservatively for now
      ) {
        if (
          pred.currentStatus != 'STOPPED_AT' &&
          pred.stop_sequence != selectedStop.stop_sequence
        ) {
          return false;
        } else if (passed.length('seconds') > 30) return false;
      }

      return true;
    })

    // limit # predictions to 3
    .slice(0, 3)

    // format for render
    .map((pred) => {
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
        arrivalIn: pred.arrivalIn,
        bearing: pred.bearing,
        location: pred.location
      };
    });

  return predictionFiltered;
};

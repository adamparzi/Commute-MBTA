// logic for everything in a mainbox

"use client";

import { useState, useEffect, useContext } from "react";
import { StopContext } from "./StopProvider";
import axios from "axios";
import apiFetch from "./apiFetch";

// name doesn't need to be fetched => use selectedStop obj instead of fetching
// mainbox top text
export const getCommuteName = () => {
  const { selectedStop } = useContext(StopContext);

  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (selectedStop && selectedStop.description)
      setDescription(selectedStop.description);
  }, [selectedStop]);

  return description;
};

export const getVehicleInfo = async (vehicleId) => {
  const params = {
    "filter[id]": vehicleId,
  };

  try {
    const vehicleResponse = await apiFetch("/vehicles", params);
    console.log("getVehicleInfo: vehicleResponse", vehicleResponse);
    return vehicleResponse.data;
  } catch (error) {
    console.error("Error fetching vehicle info:", error);
    return null;
  }
};

// mainbox bottom text
export const getCommutePrediction = () => {
  const { selectedStop } = useContext(StopContext);
  const [prediction, setPrediction] = useState([]);

  const fetchPrediction = async () => {
    const params = {
      "filter[stop]": selectedStop.id,
    };
    try {
      const predictionResponse = await apiFetch("/predictions", params);

      console.log("getCommutePrediction: response", predictionResponse);

      // Extract vehicles (limit to 4)
      const predictionsWithVehicles = await Promise.all(
        predictionResponse.data.slice(0, 5).map(async (pred) => {
          const vehicleData = pred.relationships.vehicle.data;
          const vehicleId = vehicleData && vehicleData.id; // Ensure vehicleData exists and get vehicleId

          let vehicleInfo = null;
          if (vehicleId) {
            vehicleInfo = await getVehicleInfo(vehicleId);
          }

          return {
            ...pred,
            vehicleInfo, // Attach vehicle info (if available)
          };
        }),
      );

      setPrediction(predictionsWithVehicles);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  useEffect(() => {
    fetchPrediction();

    const intervalId = setInterval(fetchPrediction, 10000); // Polling every 10 seconds
    return () => clearInterval(intervalId);
  }, [selectedStop]);

  return prediction;
};

// returns true if arrival time is in the future - otherwise false

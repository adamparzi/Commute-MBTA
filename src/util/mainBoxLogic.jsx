// logic for everything in a mainbox

"use client";

import { useState, useEffect, useContext } from "react";
import { StopContext } from "./StopProvider";
import { API_URL_BASE, API_KEY } from "@src/api/apiConfig";
import axios from "axios";

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

// mainbox bottom text
export const getCommutePrediction = () => {
  const { selectedStop } = useContext(StopContext);
  const [prediction, setPrediction] = useState([]);

  useEffect(() => {
    if (selectedStop === null || selectedStop.length === 0) {
      return;
    }

    const fetchPrediction = async () => {
      try {
        const response = await axios.get(`${API_URL_BASE}/predictions`, {
          params: {
            api_key: API_KEY,
            "filter[stop]": selectedStop.id,
          },
        });
        setPrediction(response.data.data[0].attributes.arrival_time);
      } catch (error) {
        console.error("Failed to fetch prediction:", error);
      }
    };

    // NOTE - setLoading or otherwise messing with the render will prematurely rerun useEffect()!
    fetchPrediction();
  }, [selectedStop]);

  return prediction;
};

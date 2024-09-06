"use client";

import axios from "axios";
import { API_URL_BASE, API_KEY } from "./apiConfig";

// fetch stops, create and return array of objs with id and description, sorted by description
// search by user-specified id (the description's parent's id) in predictionsAPI and wherever else needed.

// export at function header when not returning html
export const StopAPI = async () => {
  try {
    const response = await axios.get(`${API_URL_BASE}/stops`, {
      params: {
        api_key: API_KEY,
        sort: "description",
      },
    });
    // NOTE - response.data is obj by axios, containing response.data.data array from API

    // to disregard duplicate stops
    const seenStops = new Set();

    const stops = response.data.data
      .map((stop) => ({
        id: stop.id,
        description: stop.attributes.description,
        status: stop.attributes.status,
        direction_id: stop.attributes.direction_id,
      }))
      .filter((stop) => {
        // if no description, rm
        if (!stop.description) return false;

        // Split the description into parts
        const parts = stop.description.split(" - ");

        // Ensure the description has exactly 3 parts
        if (parts.length !== 3) return false;

        const [stopName, lineName, endStations] = parts;

        // if no main lines, rm
        const validLines = [
          "Green Line",
          "Red Line",
          "Blue Line",
          "Orange Line",
        ];
        if (!validLines.includes(lineName)) return false;

        // If the stop name has already been encountered, rm
        if (seenStops.has(stop.description)) return false;

        // Otherwise, add the stop name to the set
        seenStops.add(stop.description);

        //else
        return true;
      });

    return stops;
  } catch (error) {
    console.error("Error fetching stops obj:", error);
    throw error;
  }
};

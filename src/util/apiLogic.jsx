import axios from 'axios';
import { API_URL_BASE, API_KEY } from '@src/util/apiConfig';

// concept - selectedStop now contains list of id (and description bc why not) for all stops.
// Using that id, you can search for predictions (however many there are per stop).
// Within every prediction is a vehicle ID. Return an array of obj for each prediction's vehicles for location/anything else.
// Since only predicted trams are relevant here, thats all we need.

// general purpose apiFetching helper function
// doesn't use const, arrow so that it is "hoisted" and used before defined, and for simpler task
export async function apiFetch(directory, params) {
  //if (!params.length) return;
  try {
    const response = await axios.get(`${API_URL_BASE}${directory}`, {
      params: {
        api_key: API_KEY,
        ...params // spread operator is powerful - consolidate anything needed into obj to simplify code
      }
    });
    return response; // returns JUST response
  } catch (error) {
    console.error(`Error fetching MBTA data: ${error}`);
    throw error;
  }
}

// takes response obj, returns a stop object - only ID is important, filtering description bc might as well do it here
// this will be what is the context selectedStop will become.
export function apiFilter(response) {
  const seenStops = new Set();

  try {
    const stops = response.data.data
      .map((stop) => ({
        id: stop.id,
        description: stop.attributes.description,
        stop_sequence: stop.attributes.stop_sequence
      }))
      // format stop description
      .filter((stop) => {
        // if no description, rm
        if (!stop.description) return false;

        // Split the description into parts
        const parts = stop.description.split(' - ');

        // Ensure the description has exactly 3 parts
        if (parts.length !== 3) return false;

        const [stopName, lineName, endStations] = parts;

        // unsure what these are, but they don't have valid predictions => rm for now
        if (endStations == 'Track 1' || endStations == 'Track 2') return false;

        // if no main lines, rm
        const validLines = ['Green Line', 'Red Line', 'Blue Line', 'Orange Line'];
        if (!validLines.includes(lineName)) return false;

        // If the stop name has already been encountered, rm
        if (seenStops.has(stop.description)) return false;

        // Otherwise, add the stop name to the set
        seenStops.add(stop.description);

        return true;
      });
    console.log('stops:', stops);
    return stops;
  } catch (error) {
    console.error('Error fetching stops obj:', error);
    throw error;
  }
}

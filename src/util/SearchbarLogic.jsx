'use client';

import { Autocomplete, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { apiFetch, apiFilter } from './apiLogic';

const searchbarLogic = ({ onStopSelected }) => {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const fetchStops = async () => {
      const params = {
        sort: 'description'
      };
      try {
        const stopResponse = await apiFetch('/stops', params);

        console.log('full stopResponse', stopResponse);

        // important - filters API (and constantly updates) for all relevant fields
        const stopFiltered = await apiFilter(stopResponse);
        setStops(stopFiltered);
      } catch (error) {
        console.error('Failed to fetch stops:', error);
      } finally {
      }
    };
    fetchStops();
  }, []); // empty dependency array to fetch data only once

  // this handler "returns" the selectedStop to parent handler (Searchbar)
  const handleStopChange = (event, selectedStop) => {
    if (selectedStop) {
      onStopSelected(selectedStop);
    }
  };

  return (
    <div className="flex flex-col m-auto pt-3 w-64">
      <Autocomplete
        sx={{ width: 250 }}
        options={stops}
        getOptionLabel={(stopOption) => stopOption.description} // define how to display each option
        onChange={handleStopChange}
        renderInput={(params) => <TextField {...params} label="Enter a stop" />}
      />
    </div>
  );
};

export default searchbarLogic;

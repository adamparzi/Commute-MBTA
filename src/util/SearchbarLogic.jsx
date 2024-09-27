'use client';

import { Autocomplete, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { apiFetch, apiFilter } from './apiLogic';

const searchbarLogic = ({ onStopSelected }) => {
  // array of all stop options
  const [stops, setStops] = useState([]);

  // selected stop, used for localStorage updates
  const [selectedStop, setSelectedStop] = useState(() => {
    const selectStop =
      typeof window !== 'undefined' ? localStorage.getItem('selectedStop') || '' : null;
    return selectStop;
  });

  console.log('HERE SELECTEDSTOP LOCALSTORAGE', selectedStop);

  // update list of all stop options
  useEffect(() => {
    const fetchStops = async () => {
      const params = {
        sort: 'description'
      };
      try {
        const stopResponse = await apiFetch('/stops', params);

        console.log('full stopResponse', stopResponse);

        // important - filters API (and constantly updates) for all relevant fields
        const stopFiltered = apiFilter(stopResponse);
        setStops(stopFiltered);
      } catch (error) {
        console.error('Failed to fetch stops:', error);
      } finally {
      }
    };
    fetchStops();
  }, []); // empty dependency array to fetch data only once

  useEffect(() => {
    if (selectedStop.id) {
      localStorage.setItem('selectedStop', selectedStop);
    }
  }, [selectedStop]);

  // this handler "returns" the selectedStop to parent handler (Searchbar)
  const handleStopChange = (event, selectedStop) => {
    if (selectedStop.id) {
      onStopSelected(selectedStop);
      setSelectedStop(selectedStop);
    }
  };

  return (
    <div className="flex flex-col m-auto mt-4 w-64">
      <Autocomplete
        sx={{
          width: 250,
          input: { color: 'white' },
          label: { color: 'white' },
          // backgroundColor: 'darkgray',
          // borderRadius: '10x',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'darkgray' // Default border color
            },
            '&:hover fieldset': {
              borderColor: 'slategrey' // Border color when hovered
            },
            '&.Mui-focused fieldset': {
              borderColor: 'steelblue' // Border color when focused
            }
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'lightblue' // Label color when focused
          }
        }}
        options={stops}
        getOptionLabel={(stopOption) => stopOption.description} // define how to display each option
        onChange={handleStopChange}
        ListboxProps={{ style: { maxHeight: 275 } }}
        renderInput={(params) => <TextField {...params} size="small" label="Enter a stop" />}
      />
    </div>
  );
};

export default searchbarLogic;

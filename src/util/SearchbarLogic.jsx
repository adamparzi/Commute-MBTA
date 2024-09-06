"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { StopAPI } from "@src/api/StopAPI";

const searchbarLogic = ({ onStopSelected }) => {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const data = await StopAPI();
        setStops(data);
      } catch (error) {
        console.error("Failed to fetch stops:", error);
      } finally {
      }
    };

    fetchStops();
  }, []); // empty dependency array to fetch data only once

  // this handler "returns" the selectedStop to parent handler (Searchbar)
  const handleStopChange = (event, selectedStop) => {
    if (selectedStop && typeof onStopSelected === "function") {
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

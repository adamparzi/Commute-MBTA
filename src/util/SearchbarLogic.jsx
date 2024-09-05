"use client";

import { Autocomplete, TextField, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { StopAPI } from "@src/api/StopAPI";

const searchbarLogic = ({ onStopSelected }) => {
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStops = async () => {
      setLoading(true);
      try {
        const data = await StopAPI(); // fetch stops without passing stopId
        //console.log("stops COMMUTE", data)
        setStops(data); // save fetched stops to state
      } catch (error) {
        console.error("Failed to fetch stops:", error);
      } finally {
        setLoading(false);
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
        label={"Enter a stop"}
        getOptionLabel={(stopOption) => stopOption.description} // define how to display each option
        onChange={handleStopChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
};

export default searchbarLogic;

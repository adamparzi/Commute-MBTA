"use client"

import { useState, useContext } from 'react'
import SearchbarLogic from '../util/SearchbarLogic';
import HandleCommuteName from '@src/util/HandleCommuteName';
import HandlePrediction from '@src/util/HandlePrediction';
import { StopContext } from '@src/util/StopProvider';


const Searchbar = () => {
    //const [selectedStop, setSelectedStop] = useState(null);

    const { selectedStop, setSelectedStop } = useContext(StopContext)
    console.log("Searchbar selectedStop", selectedStop)


    const handleStopSelected = (stop) => {
      setSelectedStop(stop);
    };

    return (
      <div>
        <SearchbarLogic onStopSelected={handleStopSelected} />
      </div>
    );
  };

export default Searchbar;

//<CommuteName selectedStop={selectedStop} />
//<Predictions selectedStop={selectedStop} />
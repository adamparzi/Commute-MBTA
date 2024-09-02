"use client"

import { useState, useContext } from 'react'
import SearchbarLogic from '../util/SearchbarLogic';
import HandleCommuteName from '@src/util/HandleCommuteName';
import HandlePrediction from '@src/util/HandlePrediction';
import { StopContext } from '@src/util/StopProvider';


const Searchbar = () => {
    //const [selectedStop, setSelectedStop] = useState(null);

    const { setSelectedStop } = useContext(StopContext)


    const handleStopSelected = (stop) => {
      // keep local one jic - not useful
      //setSelectedStop(stop);

      // sets context (wrapper in page) with the selected stop for all components that need it
      setSelectedStop(stop);
      console.log('selected stop (Searchbar):', stop)
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
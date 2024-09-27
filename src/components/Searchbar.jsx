'use client';

import { useContext, useEffect } from 'react';
import SearchbarLogic from '../util/SearchbarLogic';
import { StopContext } from '@src/util/StopProvider';

const Searchbar = () => {
  const { selectedStop, setSelectedStop } = useContext(StopContext);

  useEffect(() => {
    const savedStop = localStorage.getItem('selectedStop');
    if (savedStop && !selectedStop.id) {
      setSelectedStop(savedStop);
    }
  }, [setSelectedStop]);

  const handleStopSelected = (stop) => {
    setSelectedStop(stop);
    localStorage.setItem('selectedStop', stop);
  };

  //console.log('HERE SELECTEDSTOP LOCALSTORAGE', selectedStop);
  return (
    <div>
      <SearchbarLogic onStopSelected={handleStopSelected} />
    </div>
  );
};

export default Searchbar;

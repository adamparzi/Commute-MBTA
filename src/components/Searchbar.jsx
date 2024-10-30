'use client';

import { useContext, useEffect } from 'react';
import SearchbarLogic from '../util/SearchbarLogic';
import { StopContext } from '@src/util/StopProvider';

const Searchbar = () => {
  const { selectedStop, setSelectedStop } = useContext(StopContext);

  useEffect(() => {
    const savedStop = localStorage.getItem('selectedStop');

    if (savedStop && !selectedStop?.id) {
      console.log('Runs');
      console.log(savedStop);
      setSelectedStop(JSON.parse(savedStop));
    }
  }, []);

  const handleStopSelected = (stop) => {
    if (stop.id) {
      console.log('runs2');
      setSelectedStop(stop);
      localStorage.setItem('selectedStop', JSON.stringify(stop));
    }
  };

  return (
    <div>
      <SearchbarLogic onStopSelected={handleStopSelected} />
    </div>
  );
};

export default Searchbar;

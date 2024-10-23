'use client';

import { useContext, useEffect } from 'react';
import SearchbarLogic from '../util/SearchbarLogic';
import { StopContext } from '@src/util/StopProvider';

const Searchbar = () => {
  const { selectedStop, setSelectedStop } = useContext(StopContext);

  useEffect(() => {
    const savedStop = localStorage.getItem('selectedStop');

    if (savedStop && !selectedStop?.id) {
      setSelectedStop(savedStop); // was JSON.parse(savedStop) - error
    }
  }, []);

  const handleStopSelected = (stop) => {
    if (stop.id) {
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

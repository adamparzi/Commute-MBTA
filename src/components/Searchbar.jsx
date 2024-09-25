'use client';

import { useContext } from 'react';
import SearchbarLogic from '../util/SearchbarLogic';
import { StopContext } from '@src/util/StopProvider';

const Searchbar = () => {
  const { selectedStop, setSelectedStop } = useContext(StopContext);

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

// wraps all MainBoxes in an N x 3 configuration
'use client';

import MainBox from './MainBox';

const BoxContainer = () => {
  return (
    <div>
      <MainBox />
      <MainBox />
    </div>
  );
};

export default BoxContainer;

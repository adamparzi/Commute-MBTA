'use client';
// useful: npm install --save <pkg name> (which is default behavior)
// --save-dev needs to be specified

import MainBox from '@src/components/MainBox';
import TitleContext from '@src/components/TitleContext';
import BoxContainer from '@src/components/BoxContainer';
import Searchbar from '@src/components/Searchbar';
import { StopProvider } from '@src/util/StopProvider';
import LiveMap from '@src/components/LiveMap';

const page = () => {
  // do you need to wrap with StopProvider? - yes
  return (
    <div>
      <TitleContext />
      <StopProvider>
        <MainBox />
        <Searchbar />
        <LiveMap />
      </StopProvider>
    </div>
  );
};

export default page;

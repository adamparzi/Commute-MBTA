'use client';
// useful: npm install --save <pkg name> (which is default behavior)
// --save-dev needs to be specified

import MainBox from '@src/components/box/MainBox';
import TitleContext from '@src/components/TitleContext';
import BoxContainer from '@src/components/box/BoxContainer';
import Searchbar from '@src/components/Searchbar';
import { StopProvider } from '@src/util/StopProvider';
//import LiveMap from '@src/components/LiveMap';

import dynamic from 'next/dynamic';

// to prevent window rendering issues for leaflet in nextjs, disable server side rendering
const LazyMap = dynamic(() => import('@src/components/map/LiveMap'), {
  ssr: false
});

const page = () => {
  // do you need to wrap with StopProvider? - yes
  return (
    <div>
      <TitleContext />
      <StopProvider>
        <MainBox />
        <Searchbar />
        <LazyMap />
      </StopProvider>
    </div>
  );
};

export default page;

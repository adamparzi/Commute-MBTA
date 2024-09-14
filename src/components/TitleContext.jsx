'use client';
// includes title, weather, and weather message at the top of main page

import { DateTime } from 'luxon';
import CurrentTime from './CurrentTime';

const TitleContext = () => {
  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-semibold text-slate-100">Commute MBTA</h1>

      <p1 className=" text-center flex flex-col font-semibold text-slate-100">
        <CurrentTime />
      </p1>
    </div>
  );
};

export default TitleContext;

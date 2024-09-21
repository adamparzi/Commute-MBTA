'use client';
// includes title, weather, and weather message at the top of main page

import CurrentTime from './CurrentTime';
import WeatherWidget from './WeatherWidget';

const TitleContext = () => {
  return (
    <div className="flex flex-col items-center m-2">
      <h1 className="text-2xl font-semibold text-slate-100">Commute MBTA</h1>

      <p1 className="font-semibold text-slate-100">
        <CurrentTime />
      </p1>

      <WeatherWidget />

      <hr className="border-gray-500 mx-auto my-2 w-[1000px]" />
    </div>
  );
};

export default TitleContext;

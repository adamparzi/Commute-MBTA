'use client';

import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(DateTime.now().setLocale('en-GB'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // if (!currentTime) {
  //   return null; // Don't render anything on the server side
  // }

  return (
    <>
      {currentTime ? (
        <div className="font-semibold text-slate-100">
          {currentTime.toFormat('ccc, dd LLL HH:mm:ss')}
        </div>
      ) : (
        <p className="text-slate-400">Loading...</p>
      )}
    </>
  );
};

export default CurrentTime;

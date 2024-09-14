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

  if (!currentTime) {
    return null; // Don't render anything on the server side
  }

  return <div>{currentTime.toFormat('ccc, dd LLL HH:mm:ss')}</div>;
};

export default CurrentTime;

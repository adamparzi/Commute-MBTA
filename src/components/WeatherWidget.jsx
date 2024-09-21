'use client';

import axios from 'axios';
import { WEATHER_API_KEY } from '../util/apiConfig';
import { useEffect, useState } from 'react';

const WeatherWidget = () => {
  const [weatherResponse, setWeatherResponse] = useState(null);
  const lat = 42.3601;
  const lng = -71.0589;
  const forecastDay = 1; // only want
  const fetchWeatherAPI = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=${forecastDay}&appid=${WEATHER_API_KEY}`
      );

      setWeatherResponse(response.data.weather);
    } catch (error) {
      console.error(`Error fetching weather data: ${error}`);
      throw error;
    }
  };

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   setCurrentTime(DateTime.now().setLocale('en-GB'));
    // }, 1000);
    // return () => clearInterval(intervalId);
    fetchWeatherAPI();
  }, []);

  console.log('HERE WEATHER', weatherResponse);
  return (
    <div className="flex">
      <div>test</div>
    </div>
  );
};

export default WeatherWidget;

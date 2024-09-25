'use client';

import axios from 'axios';
import { WEATHER_API_KEY } from '../util/apiConfig';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const WeatherWidget = () => {
  const [weatherResponse, setWeatherResponse] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const lat = 42.3601;
  const lon = -71.0589;

  const fetchWeatherAPI = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=4&appid=${WEATHER_API_KEY}&units=imperial`
      );
      setWeatherResponse(response);
    } catch (error) {
      console.error(`Error fetching weather data: ${error}`);
      throw error;
    }
  };

  const fetchIcon = async (icon) => {
    try {
      const response = await axios.get(`https://openweathermap.org/img/wn/${icon}.png`, {
        responseType: 'blob' // Ensure we get binary data (blob)
      });

      const imageUrl = URL.createObjectURL(response.data);

      setIconUrl(imageUrl);
    } catch (error) {
      console.error(`Error fetching weather data: ${error}`);
      throw error;
    }
  };

  // any precipitation within 9hrs takes precedence
  // else return current weather (within 3hrs of now)
  // ** empty array works for .map, but NOT empty obj **
  const weatherHr = _.get(weatherResponse, 'data.list', []);

  const weatherData = weatherHr.map((hr) => {
    return {
      description: hr?.weather[0].main,
      iconId: hr?.weather[0]?.icon,
      temp: Math.round(hr?.main?.temp),
      time: DateTime.fromSeconds(hr?.dt).toLocaleString(DateTime.TIME_24_SIMPLE) //unix time -> 24 hr clock
    };
  });

  useEffect(() => {
    fetchWeatherAPI();

    const intervalId = setInterval(fetchWeatherAPI, 60000); // Polling every min
    return () => clearInterval(intervalId);
  }, []);

  // precip is either undefined (falsy) or precip.key is a precipitation
  const precipOptions = ['Thunderstorm', 'Drizzle', 'Rain', 'Snow'];
  const precip = weatherData.find((hr) =>
    precipOptions.some((desc) => desc.includes(hr.description))
  );
  console.log('precip:', precip);

  var description;

  // if there's precipitation, give the estimated start time
  // else give current weather
  if (precip) description = `${precip.description} at ${precip.time}`;
  else description = weatherData[0]?.description;

  // keep icon as current weather, regardless of future precip or not
  useEffect(() => {
    if (weatherData[0]?.iconId) {
      fetchIcon(weatherData[0].iconId);
    }
  }, [weatherData[0]?.iconId]);

  console.log('weatherHr', weatherHr);
  console.log('weatherData', weatherData);
  console.log('weatherIcon', iconUrl);
  console.log('weatherData.iconId', weatherData[0]?.iconId);
  console.log('weatherResponse?.data', weatherResponse?.data);

  return (
    <div className="flex items-center  ">
      <img src={iconUrl} />
      <p className="text-slate-100 -my-2">{weatherData ? description : ''}</p>
    </div>
  );
};

export default WeatherWidget;

"use client";

import { useState, useEffect } from "react";
const API_KEY = process.env.REACT_APP_MBTA_API;

const BASE_URL = "https://api-v3.mbta.com"; // Base URL for MBTA API

//${API_KEY}
//ed901e581df34ae8b5e679f69a0af510
const API_URL = `${BASE_URL}/stops?filter%5Broute_type%5D=0&api_key=ed901e581df34ae8b5e679f69a0af510`;
// ^ filters for green line (route_type=0)
// figure out why .env reference isnt working.. comes up as undefined

// blandford st. green line b stop has id='70148'
const MbtaAPI = () => {
  //const [stop, setStop] =

  useEffect(() => {
    console.log("useEffect runs"); // runs twice bc of React strict mode - fine

    //   fetch(API_URL)
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((data) => {
    //       console.log(data.json);
    //     });
    const fetchData = async () => {
      const result = await fetch(API_URL);
      result.json().then((json) => {
        console.log(json);
      });
    };
    fetchData();
  }, []);

  return <div>mbtaAPI returns: {} </div>;
};

export default MbtaAPI;

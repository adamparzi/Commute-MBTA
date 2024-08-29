"use client";

import { useState, useEffect } from "react";
const API_KEY = process.env.NEXT_PUBLIC_MBTA_API;
const API_URL = `https://api-v3.mbta.com/stops?filter%5Broute_type%5D=0&api_key=${API_KEY}`;


// blandford st. green line b stop has id='70148'
const MbtaAPI = () => {
  const [stops, setStops] = useState([]);
  const targetID = "70148";

  useEffect(() => {
    fetch(API_URL)
        .then(response => response.json())
        .then(responseJson => {
          //console.log(responseJson.data[0].id)
          //console.log(responseJson.data);
          setStops(responseJson.data);
        })




}, []);

if (stops.length) { // remember that stops is an empty array at first
  let selectedStop = stops.find(stop => stop.id === targetID) // selectedStop is the one stop with the targetID
  //return <div>{selectedStop.attributes.description} </div>;
  return selectedStop.attributes.description;
}


};

export default MbtaAPI;

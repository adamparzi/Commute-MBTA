// Individual border box containing commute title and MBTA arrival time
// will eventually take props to fill in the API + time parts

"use client"; // directive to prevent some useState error

import { useEffect, useState } from "react";
import { fetchGreenLineBStops, fetchStopPredictions } from "../api/PredictionAPI"; // Import the API functions
import MbtaAPI from "../api/PredictionAPI";
import Predictions from "./Predictions";
import CommuteName from "./CommuteName";


const MainBox = () => {
  
 

  //let bottomText = <Predictions stopId={"70149"} />
  let topText = <CommuteName stopId={"70149"} />

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-[3px] border-gray-500 px-2 py-1 text-center rounded-lg w-72 bg-gray-700">
        {/* Top Component */}
        <div className="">
          <span className="text-sm font-medium whitespace-normal break-words text-slate-100">
          {topText}
          </span>
        </div>
        {/* Horizontal Line */}
        <hr className="border-gray-500 mx-4 my-1" />
        {/* Bottom Component */}
        <div className="my-4">
          <span className="text-3xl font-bold text-slate-100">bottomText</span>
        </div>
      </div>
    </div>
  );
};

export default MainBox;

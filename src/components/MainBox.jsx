// Individual border box containing commute title and MBTA arrival time
// will eventually take props to fill in the API + time parts

"use client"; // directive to prevent some useState error

import React, { useEffect, useState } from "react";
import { fetchGreenLineBStops, fetchStopPredictions } from "../api/MbtaAPI"; // Import the API functions
import MbtaAPI from "../api/MbtaAPI";

const MainBox = () => {
  let topText = <MbtaAPI />

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-2 border-gray-500 px-2 py-1 text-center rounded-lg w-72 bg-gray-700">
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
          <span className="text-3xl font-bold text-slate-100">16 min (13:48)</span>
        </div>
      </div>
    </div>
  );
};

export default MainBox;
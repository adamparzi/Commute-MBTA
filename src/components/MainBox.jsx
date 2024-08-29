// Individual border box containing commute title and MBTA arrival time
// will eventually take props to fill in the API + time parts

"use client"; // directive to prevent some useState error

import React, { useEffect, useState } from "react";
import { fetchGreenLineBStops, fetchStopPredictions } from "../api/MbtaAPI"; // Import the API functions

const MainBox = () => {
  let topText = "topText";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-2 border-gray-500 px-2 py-1 text-center rounded-lg w-72">
        {/* Top Component */}
        <div className="">
          <span className="text-sm font-medium whitespace-normal break-words">
            {topText} Green Line B Harvard Ave to Government Square
          </span>
        </div>
        {/* Horizontal Line */}
        <hr className="border-gray-300 mx-4 my-1" />
        {/* Bottom Component */}
        <div className="my-4">
          <span className="text-3xl font-bold">16 min (13:48)</span>
        </div>
      </div>
    </div>
  );
};

export default MainBox;

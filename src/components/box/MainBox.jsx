'use client'; // directive to prevent some useState error

import MainBoxTopText from './MainBoxTopText';
import MainBoxBottomText from './MainBoxBottomText';

const MainBox = () => {
  // Individual bordered box containing commute name and ETAy

  return (
    <div className="flex justify-center m-2">
      <div className="border-[3px] border-gray-500 rounded-lg w-72 bg-gray-700">
        {/* Top Component */}
        <div className="">
          <MainBoxTopText />
        </div>
        {/* Horizontal Line */}
        <hr className="border-gray-500 mx-4 my-1" />
        {/* Bottom Component */}
        <MainBoxBottomText />
      </div>
    </div>
  );
};

export default MainBox;

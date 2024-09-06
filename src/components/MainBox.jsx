'use client'; // directive to prevent some useState error

import MainBoxTopText from './MainBoxTopText';
import MainBoxBottomText from './MainBoxBottomText';

const MainBox = () => {
  // Individual bordered box containing commute name and ETAy

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-[3px] border-gray-500 px-2 py-1 text-center rounded-lg w-72 bg-gray-700">
        {/* Top Component */}
        <div className="">
          <span className="text-sm font-medium whitespace-normal break-words text-slate-100">
            <MainBoxTopText />
          </span>
        </div>
        {/* Horizontal Line */}
        <hr className="border-gray-500 mx-4 my-1" />
        {/* Bottom Component */}
        <div className="my-4">
          <span className="text-3xl font-bold text-slate-100">
            <MainBoxBottomText />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainBox;

"use client";
import { getCommutePrediction } from "@src/util/mainBoxLogic";

const MainBoxBottomText = () => {
  const prediction = getCommutePrediction();

  if (prediction === null || !prediction.length)
    return <div>Select a stop</div>;

  return <div> Next arrival at {prediction.toString().substring(11, 16)}</div>;
};

export default MainBoxBottomText;

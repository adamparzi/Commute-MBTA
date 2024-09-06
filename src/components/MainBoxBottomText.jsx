"use client";
import { getCommutePrediction } from "@src/util/mainBoxLogic";

const MainBoxBottomText = () => {
  const [eta, status] = getCommutePrediction();
  console.log("status", status);
  console.log("eta", eta);

  if (eta === null || !eta.length || status === null || !status.length)
    return <div>Enter a stop below</div>;

  return (
    <div>
      <div>Next arrival at {eta.toString().substring(11, 16)}</div>
      <div>Test: {status}</div>
    </div>
  );
};

export default MainBoxBottomText;

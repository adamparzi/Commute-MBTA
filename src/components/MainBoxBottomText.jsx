'use client';
import { getCommutePrediction } from '@src/util/mainBoxLogic';

const MainBoxBottomText = () => {
  const prediction = getCommutePrediction();
  console.log('BottomText: prediction', prediction);

  if (!prediction || !prediction.length) return <div>Enter a stop below</div>;

  return <div></div>;
};
//{prediction.pred.data[0].attributes.arrival_time.toString().substring(11, 16)}
export default MainBoxBottomText;

//{}
//    Next arrival at: {prediction[0]}

// ---- OLD
// <div>
//   {/* Check if predictions array exists and has at least 1 item */}
//   {predictionTimes.length > 0 && (
//     <div className="large-prediction">
//       {predictions[0].time} min – {predictions[0].destination}
//     </div>
//   )}

//   {/* Check if predictions array has at least 2 items */}
//   {predictions.length > 1 && (
//     <div className="small-prediction">
//       {predictions[1].time} min – {predictions[1].destination}
//     </div>
//   )}

//   {/* Check if predictions array has at least 3 items */}
//   {predictions.length > 2 && (
//     <div className="small-prediction">
//       {predictions[2].time} min – {predictions[2].destination}
//     </div>
//   )}

//   {/* If no predictions exist */}
//   {predictions.length === 0 && <p>No upcoming predictions</p>}
// </div>

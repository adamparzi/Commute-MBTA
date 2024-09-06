'use client';
import { getCommutePrediction } from '@src/util/mainBoxLogic';

const MainBoxBottomText = () => {
  // prediction JSON object now has fields 'pred' and 'vehicle'
  const prediction = getCommutePrediction();
  console.log('BottomText: prediction', prediction);

  if (prediction === null || !prediction.length) return <div>Enter a stop below</div>;

  return (
    <div>
      <div>
        Next arrival at
        {prediction.pred.data[0].attributes.arrival_time.toString().substring(11, 16)}
      </div>
      <div>Test: {status}</div>
    </div>
  );
};

export default MainBoxBottomText;

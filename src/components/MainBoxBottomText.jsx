'use client';
import { getCommutePrediction } from '@src/util/mainBoxLogic';

const MainBoxBottomText = () => {
  const pred = getCommutePrediction();
  console.log('BottomText: prediction', pred);

  return (
    <div className="mb-2">
      <div className="flex flex-col my-3 text-3xl font-bold">
        {!pred[0] ? (
          <div className="text-center text-slate-100">No info available</div>
        ) : pred[0].currentStatus ? (
          <div className="text-center text-slate-100">{pred[0].currentStatus}</div>
        ) : (
          <div className="flex">
            <span className="text-center text-slate-100">
              Next arrival at: {pred[0].arrivalAtTime}
              <span className="text-sm text-slate-400"> &#40;{pred[0].arrivalIn}&#41;</span>
            </span>
          </div>
        )}
      </div>
      <div className="text-sm font-bold text-slate-400">
        {!pred[1] ? null : pred[1].currentStatus ? (
          <div className="text-center">{pred[1].currentStatus}</div>
        ) : (
          <div className="text-center">
            {pred[1].arrivalAtTime} &#40;{pred[1].arrivalIn}&#41;
          </div>
        )}
      </div>
      <div className="text-sm font-bold text-slate-400">
        {!pred[2] ? null : pred[2].currentStatus ? (
          <div className="text-center">{pred[2].currentStatus}</div>
        ) : (
          <div className="text-center">
            {pred[2].arrivalAtTime} &#40;{pred[2].arrivalIn}&#41;
          </div>
        )}
      </div>
    </div>
  );
};
export default MainBoxBottomText;

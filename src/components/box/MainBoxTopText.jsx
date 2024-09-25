'use client';

import { getCommuteName } from '@src/util/mainBoxLogic';

const MainBoxTopText = () => {
  const commuteName = getCommuteName();

  return (
    <div className="mx-4 text-sm font-medium whitespace-normal text-center break-words text-slate-100">
      {commuteName}
    </div>
  );
};

export default MainBoxTopText;

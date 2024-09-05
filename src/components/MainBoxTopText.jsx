"use client";

import { getCommuteName } from "@src/util/mainBoxLogic";

const MainBoxTopText = () => {
  const commuteName = getCommuteName();

  return <div>{commuteName}</div>;
};

export default MainBoxTopText;

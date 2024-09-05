"use client";
// useful: npm install --save <pkg name>

import MainBox from "@src/components/MainBox";
import TitleContext from "@src/components/TitleContext";
import BoxContainer from "@src/components/BoxContainer";
import Searchbar from "@src/components/Searchbar";
import { StopProvider } from "@src/util/StopProvider";

const page = () => {
  // do you need to wrap with StopProvider? - yes
  return (
    <div>
      <TitleContext />
      <StopProvider>
        <MainBox />
        <Searchbar />
      </StopProvider>
    </div>
  );
};

export default page;

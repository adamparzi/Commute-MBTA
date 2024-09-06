"use client";
// useful: npm install --save <pkg name>

import MainBox from "@src/components/MainBox";
import TitleContext from "@src/components/TitleContext";
import BoxContainer from "@src/components/BoxContainer";
import Searchbar from "@src/components/Searchbar";
import { StopProvider } from "@src/util/StopProvider";

// testing feature branching strategy!

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

// testing feature branching strategy!

export default page;

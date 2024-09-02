import MainBox from "@src/components/MainBox";
import TitleContext from "@src/components/TitleContext";
import MbtaAPI from "@src/api/PredictionAPI";
import BoxContainer from "@src/components/BoxContainer";
import Searchbar from "@src/components/Searchbar";
import { StopProvider } from "@src/util/StopProvider";


const page = () => {

  // const handleStopSelected = (stopId) => {
  //   setSelectedStopId(stopId);
  // };

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

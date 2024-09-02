import MainBox from "@src/components/MainBox";
import TitleContext from "@src/components/TitleContext";
import MbtaAPI from "@src/api/PredictionAPI";
import BoxContainer from "@src/components/BoxContainer";
import CommuteSearchbar from "@src/components/CommuteSearchbar";

const page = () => {

  const handleStopSelected = (stopId) => {
    setSelectedStopId(stopId);
  };

  return (
    <div>
      <TitleContext />
      <MainBox />
      <CommuteSearchbar />
    </div>
  );
};

export default page;

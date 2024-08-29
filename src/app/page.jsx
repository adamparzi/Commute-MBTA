import MainBox from "@src/components/MainBox";
import TitleContext from "@src/components/TitleContext";
import MbtaAPI from "@src/api/MbtaAPI";
import BoxContainer from "@src/components/BoxContainer";

const page = () => {
  return (
    <div>
      <TitleContext />
      <MainBox />
    </div>
  );
};

export default page;

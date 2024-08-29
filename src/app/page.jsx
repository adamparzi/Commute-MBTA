import MainBox from "@src/components/MainBox";
import TitleContext from "@src/components/TitleContext";
import MbtaAPI from "@src/api/MbtaAPI";

const page = () => {
  return (
    <div>
      <TitleContext />
      <MainBox />
      <MbtaAPI />
    </div>
  );
};

export default page;

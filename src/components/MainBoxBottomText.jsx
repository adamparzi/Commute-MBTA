
import HandlePrediction from "@src/util/HandlePrediction"

const MainBoxBottomText = () => {
    const prediction = <HandlePrediction />;
    console.log("HandlePrediction in mainbottomtext",<HandlePrediction />);


    if (prediction === null || !prediction){
        return <div>NULL</div>
    } else {
        console.log("prediction mainbottomtext",prediction);
        //return <div> Next arrival at {(prediction.attributes.arrival_time).substring(11,16)}</div>;
        return <div> test </div>
    }
}

export default MainBoxBottomText
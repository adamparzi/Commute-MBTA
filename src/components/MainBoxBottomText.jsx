"use client"
import HandlePrediction from "@src/util/HandlePrediction"

const MainBoxBottomText = () => {
    const prediction = HandlePrediction();
    //console.log("HandlePrediction in mainbottomtext", HandlePrediction().toString());

    console.log("prediction mainbottomtext", prediction);

    if (prediction === null || !prediction.length)
        return <div>Select a stop</div>
        
    return <div> Next arrival at {(prediction).toString().substring(11,16)}</div>;
    //return <div>{prediction}</div>
    }

export default MainBoxBottomText
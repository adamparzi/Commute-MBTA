import { useState, useEffect, useContext } from "react";
import { StopContext } from "./StopProvider";
import { API_URL_BASE, API_KEY } from "@src/api/apiConfig";
import axios from "axios";


const HandlePrediction = () => {
  const { selectedStop } = useContext(StopContext)
  const [prediction, setPrediction] = useState([]);

  if (selectedStop){
    console.log("handleprediction: selectedstop ", selectedStop);
    console.log("handleprediction: selectedstop.id ", selectedStop.id)
  };


  //const [loading, setLoading] = useState([]);


  useEffect(() => {

    console.log("handleprediction: selectedstop WAAA", selectedStop)

    if (selectedStop === null){
      return;
    }


    const fetchPrediction = async () => {
      //setLoading(true);
      try {
        const response = await axios.get(`${API_URL_BASE}/predictions`, {
          params: {
            api_key: API_KEY,
            "filter[stop]": selectedStop.id,
          }
        });
        console.log("handleprediction: RESPONSE ", response.data.data[0].attributes.arrival_time);
        setPrediction(response.data.data[0].attributes.arrival_time)
      } catch (error) {
        console.error("Failed to fetch prediction", error);
      }
    };

    // NOTE - setLoading or otherwise messing with the render will prematurely rerun useEffect()!
    fetchPrediction();
  }, [selectedStop]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  console.log("FINAL PREDICTION HANDLEPREDICTION", prediction)

  return prediction
    
};
  
  export default HandlePrediction;

  // return (
  //   <div>
  //         Next arrival at {(prediction.attributes.arrival_time).substring(11,16)}
  //   </div>
  // );


  // Route: {prediction.relationships.route.data.id}
  // {predictions.map(prediction => (
  //   <li key={prediction.id}>
  //      Arrival in {prediction.attributes.arrival_time}
  //   </li>
  // ))}
import { useState, useEffect, useContext } from "react";
import { PredictionAPI } from '../api/PredictionAPI';
import { StopContext } from "./StopProvider";
import { API_URL_BASE } from "@src/api/apiConfig";


const HandlePrediction = () => {
  console.log("BING BONG", selectedStop);

  const { selectedStop } = useContext(StopContext)
  console.log("selectedstop in handleprediction", selectedStop);

  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("use effect runs")
    const fetchPrediction = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${API_URL_BASE}/predictions`, {
          params: {
            api_key: API_KEY,
            "filter[stop]": selectedStop.id,
            //include: 'route',
          }
        });
      } catch (error) {
        console.error("Failed to fetch prediction", error);
      } finally {
        setLoading(false);
      }

      console.log(response.data);

    };

    fetchPrediction();
  }, [selectedStop]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("prediction: ",prediction)

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
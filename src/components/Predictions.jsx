import { useState, useEffect } from "react";
import { PredictionAPI } from '../api/PredictionAPI';


const Predictions = ({ stopId }) => {

    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPredictions = async () => {
        setLoading(true);
        try {
          const data = await PredictionAPI(stopId);
          setPredictions(data.data);
        } catch (error) {
          console.error("Failed to fetch predictions", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPredictions();
    }, [stopId]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
            Next arrival at {(predictions[0].attributes.arrival_time).substring(11,16)}
      </div>
    );
  };
  
  export default Predictions;
  //Route: {prediction.relationships.route.data.id}
//   {predictions.map(prediction => (
//     <li key={prediction.id}>
//        Arrival in {prediction.attributes.arrival_time}
//     </li>
//   ))}
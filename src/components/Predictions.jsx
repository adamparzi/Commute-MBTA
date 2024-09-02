import { useState, useEffect } from "react";
import { PredictionAPI } from '../api/PredictionAPI';


const Predictions = ({selectedStop}) => {

    const [prediction, setPrediction] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPrediction = async () => {
        setLoading(true);
        try {
          const data = await PredictionAPI(selectedStop.id);
          setPrediction(data);
        } catch (error) {
          console.error("Failed to fetch prediction", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPrediction();
    }, [selectedStop]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
            Next arrival at {(prediction.attributes.arrival_time).substring(11,16)}
      </div>
    );
  };
  
  export default Predictions;


  // Route: {prediction.relationships.route.data.id}
  // {predictions.map(prediction => (
  //   <li key={prediction.id}>
  //      Arrival in {prediction.attributes.arrival_time}
  //   </li>
  // ))}
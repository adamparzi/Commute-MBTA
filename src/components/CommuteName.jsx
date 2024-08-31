import { useState, useEffect } from "react";
import { StopAPI } from "@src/api/StopAPI";


const CommuteName = ({ stopId }) => { // by default, CommuteName uses name of stop - uses StopAPI

    const [stops, setStops] = useState([]); // need array? only 1 stop given stopId
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchStops = async () => {
        setLoading(true);
        try {
          const data = await StopAPI(stopId);
          setStops(data.data);
        } catch (error) {
          console.error("Failed to fetch stops: ", error);
        } finally {
          
          setLoading(false);
        }
        
      };

      fetchStops();
    }, [stopId]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
            Stop: {stops.attributes.description}
      </div>
    );
  };
  
  export default CommuteName;
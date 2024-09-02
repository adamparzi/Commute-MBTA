import { useState, useEffect } from "react";
import { StopAPI } from "@src/api/StopAPI";
import { DescriptionsAPI } from "@src/api/DescriptionsAPI";

// name doesn't need to be fetched, only predicted time => use given stop obj instead of fetching from id
const CommuteName = ({ selectedStop }) => {
  const [description, setDescription] = useState(null);
  
    useEffect(() => {
      if (selectedStop && selectedStop.description)
        setDescription(selectedStop.description);

    }, [selectedStop]);

    // if (loading) {
    //   return <div>Loading...</div>;
    // }
  
    return (
      <div>
        Stop: {description}
      </div>
    );
  }; 
            
            
 
  export default CommuteName;
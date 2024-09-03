"use client"


import { useState, useEffect, useContext } from "react";
import { StopAPI } from "@src/api/StopAPI";
import { DescriptionsAPI } from "@src/api/DescriptionsAPI";
import { StopContext } from "./StopProvider";

// name doesn't need to be fetched, only predicted time => use given stop obj instead of fetching from id
const HandleCommuteName = () => {

  const { selectedStop } = useContext(StopContext);
  
  const [description, setDescription] = useState(null);
  
    useEffect(() => {
      if (selectedStop && selectedStop.description)
        setDescription(selectedStop.description);

    }, [selectedStop]);

    // if (loading) {
    //   return <div>Loading...</div>;
    // }
  
    return description;
  }; 
            

  // return (
  //   <div>
  //     Stop: {description}
  //   </div>
  // );
            
 
  export default HandleCommuteName;
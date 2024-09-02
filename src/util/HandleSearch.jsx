import { useState } from 'react'
import CommuteSearchbar from '../components/CommuteSearchbar';
import CommuteName from '@src/components/CommuteName';
import Predictions from '@src/components/Predictions';


const HandleSearch = () => {
    const [selectedStop, setSelectedStop] = useState(null);
    // if (typeof handleStopSelected === 'function')
    //   console.log("handlestopselected not a func")
    // else
    //   console.log("handler is a func")


    // gives selected stop id to all components that need it
    const handleStopSelected = (stop) => {
      setSelectedStop(stop);
      console.log('selected stop:', stop)
    };

    console.log("handlesearch:", handleStopSelected(selectedStop));
    return (
      <div>
        <CommuteSearchbar onStopSelected={handleStopSelected} />
        <CommuteName selectedStop={selectedStop} />
        <Predictions selectedStop={selectedStop} />
      </div>
    );
  };

export default HandleSearch;
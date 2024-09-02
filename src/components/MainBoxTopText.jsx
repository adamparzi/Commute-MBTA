
import HandleCommuteName from "@src/util/HandleCommuteName"
import { useEffect } from "react"

const MainBoxTopText = () => {
    const commuteName = <HandleCommuteName />
    
    if (commuteName == "")
        return <div>Select a stop</div>

  return (
    <div><HandleCommuteName /></div>
  )
}

export default MainBoxTopText
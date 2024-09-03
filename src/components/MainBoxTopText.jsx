"use client"
import HandleCommuteName from "@src/util/HandleCommuteName"
import { useEffect } from "react"

const MainBoxTopText = () => {
    const commuteName = HandleCommuteName();
    console.log("commutename",commuteName)

  return (
    <div>{commuteName}</div>
  )
}

export default MainBoxTopText
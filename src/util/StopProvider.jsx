"use client"
import { createContext, useState } from 'react';

const StopContext = createContext();

const StopProvider = ({ children }) => {
  const [selectedStop, setSelectedStop] = useState([]);
  console.log("StopProvider selectedStop", selectedStop)

  return (
    <StopContext.Provider value={{ selectedStop, setSelectedStop }}>
      {children}
    </StopContext.Provider>
  );
};

export { StopContext, StopProvider};
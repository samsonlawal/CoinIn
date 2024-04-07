import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [coinData, setCoinData] = useState([]);

  return (
    <DataContext.Provider value={{ coinData, setCoinData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

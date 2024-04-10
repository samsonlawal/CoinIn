import React, { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  // const [coinData, setCoinData] = useState([]);
  const [clicked, setClicked] = useState();

  return (
    <DataContext.Provider value={{ clicked, setClicked }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };

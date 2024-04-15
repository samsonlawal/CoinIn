import { createContext } from "react";

export const DataContext = createContext(null);

// const DataProvider = ({ children }) => {
// const [coinData, setCoinData] = useState([]);
// const [clicked, setClicked] = useState();

// return (
//   <DataContext.Provider value={{ clicked, setClicked }}>
//     {children}
//   </DataContext.Provider>
// );
// };

// export { DataContext, DataProvider };

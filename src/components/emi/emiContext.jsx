import { createContext, useState } from "react";

export const EmiContext = createContext();

const initialData = {
  principle: 0,
  rate: 0,
  tenure: 0,
};

// eslint-disable-next-line react/prop-types
const EmiContextProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  return (
    <EmiContext.Provider value={{ data, setData }}>
      {children}
    </EmiContext.Provider>
  );
};

export default EmiContextProvider;

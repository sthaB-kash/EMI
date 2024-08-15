import { createContext, useState } from "react";

export const EmiContext = createContext();

const initialData = {
  principle: 0,
  rate: 0,
  tenure: 0,
  date: null,
};

// eslint-disable-next-line react/prop-types
const EmiContextProvider = ({ children }) => {
  const [loanDetails, setLoanDetails] = useState(initialData);
  return (
    <EmiContext.Provider value={{ loanDetails, setLoanDetails }}>
      {children}
    </EmiContext.Provider>
  );
};

export default EmiContextProvider;

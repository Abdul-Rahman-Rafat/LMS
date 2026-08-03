import { createContext } from "react";
export const AppContext = createContext();

const currency = import.meta.env.VITE_CURRENCY || "$";
const value = { currency };

export const AppContextProvider = ({ children }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

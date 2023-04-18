import { createContext } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};
export default Provider;

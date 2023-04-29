import { createContext } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  return <Context.Provider>{children}</Context.Provider>;
};

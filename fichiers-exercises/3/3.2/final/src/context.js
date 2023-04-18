import { createContext, useReducer } from "react";

export const Context = createContext();

const initialState = {
  count: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
      };
    case "decrement":
      return {
        count: state.count - 1,
      };
    case "incrementBy10":
      return {
        count: state.count + 10,
      };
    case "decrementBy10":
      return {
        count: state.count - 10,
      };
    case "reset":
      return {
        count: 0,
      };
    default:
      return state;
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
export default Provider;

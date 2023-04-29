import { useState, useEffect, useReducer, useContext } from "react";
import { Context } from "./context";
import "./App.css";

const styles = {
  container: { width: "40%" },
};

const Count = () => {
  const value = useContext(Context);
  const [state] = value;
  const [aboveZero, toggleAboveZero] = useState(false);

  useEffect(() => {
    toggleAboveZero(state.count >= 0);
  }, [state.count]);

  if (aboveZero) {
    return <p className="text-primary h1 mb-2">{state.count}</p>;
  }
  return <p className="text-danger text-primary h1 mb-2">{state.count}</p>;
};
const TopButtons = () => {
  const value = useContext(Context);
  const [_, dispatch] = value;

  const increment = () => dispatch({ type: "increment" });
  const decrement = () => dispatch({ type: "decrement" });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div className="d-flex justify-content-center mb-3">
      <button
        onClick={increment}
        className="App-button-50 btn btn-secondary btn-sm"
      >
        +
      </button>
      <button
        onClick={decrement}
        className="App-button-50 btn btn-secondary btn-sm mx-2"
      >
        -
      </button>
      <button onClick={reset} className="App-button-50 btn btn-dark btn-sm">
        <img
          src="https://img.icons8.com/android/24/FFFFFF/recurring-appointment.png"
          alt="reset"
        />
      </button>
    </div>
  );
};

const BottomButtons = () => {
  const value = useContext(Context);
  const [_, dispatch] = value;

  const increment = () => dispatch({ type: "incrementBy10" });
  const decrement = () => dispatch({ type: "decrementBy10" });

  return (
    <div className="d-flex justify-content-center mb-3">
      <button
        onClick={increment}
        className="App-button-75 btn btn-secondary btn-sm mx-1"
      >
        +
      </button>
      <button
        onClick={decrement}
        className="App-button-75 btn btn-secondary btn-sm mx-2"
      >
        -
      </button>
    </div>
  );
};
function App() {
  return (
    <div className="container mt-5" style={styles.container}>
      <h1 className="text-center">Counter App</h1>
      <div className="App-border text-center p-4">
        <Count />
        <TopButtons />
        <BottomButtons />
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect, useReducer } from "react";
import "./App.css";

const styles = {
  container: { width: "40%" },
};

const Count = ({ aboveZero, count }) => {
  if (aboveZero) {
    return <p className="text-primary h1 mb-2">{count}</p>;
  }
  return <p className="text-danger text-primary h1 mb-2">{count}</p>;
};
const TopButtons = ({ increment, decrement, reset }) => {
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

const BottomButtons = ({ increment, decrement }) => {
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

function App() {
  // useState
  const [state, dispatch] = useReducer(reducer, initialState);
  const [count, setCount] = useState(0);
  const [aboveZero, toggleAboveZero] = useState(false);
  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);
  const incrementBy10 = () => setCount((prevCount) => prevCount + 10);
  const decrementBy10 = () => setCount((prevCount) => prevCount - 10);
  const reset = () => setCount(0);

  useEffect(() => {
    toggleAboveZero(state.count >= 0);
  }, [state.count]);

  return (
    <div className="container mt-5" style={styles.container}>
      <h1 className="text-center">Counter App</h1>
      <div className="App-border text-center p-4">
        <Count count={state.count} aboveZero={aboveZero} />
        <TopButtons increment={increment} decrement={decrement} reset={reset} />
        <BottomButtons increment={incrementBy10} decrement={decrementBy10} />
      </div>
    </div>
  );
}

export default App;

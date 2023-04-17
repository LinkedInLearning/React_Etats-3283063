import { useState, useEffect } from "react"
import "./App.css";

const styles = {
  container: { width: "40%" },
};

function App() {
  // useState
  const [count, setCount] = useState(0)
  const [aboveZero, toggleAboveZero] = useState(false)
  const increment = () => setCount(prevCount => prevCount + 1)
  const decrement = () => setCount(prevCount => prevCount - 1)
  const reset = () => setCount(0)

  useEffect(() => {
    toggleAboveZero(count >= 0)
  }, [count])

  return (
    <div className="container mt-5" style={styles.container}>
      <h1 className="text-center">Counter App</h1>
      <div className="App-border p-4">
        {aboveZero && <p className="text-center text-primary h1 mb-2">{count}</p>}
        {!aboveZero && <p className="text-center text-danger h1 mb-2">{count}</p>}
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
      </div>
    </div>
  );
}

export default App;

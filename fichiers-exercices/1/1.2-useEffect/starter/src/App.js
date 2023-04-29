import { useState } from "react"
import "./App.css";

const styles = {
  container: { width: "40%" },
};

function App() {
  // useState
  const [count, setCount] = useState(0)
  const increment = () => setCount(prevCount => prevCount + 1)
  const decrement = () => setCount(prevCount => prevCount - 1)

  return (
    <div className="container mt-5" style={styles.container}>
      <h1 className="text-center">Counter App</h1>
      <div className="App-border p-4">
        <p className="text-center text-primary h1 mb-2">{count}</p>
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
        </div>
      </div>
    </div>
  );
}

export default App;

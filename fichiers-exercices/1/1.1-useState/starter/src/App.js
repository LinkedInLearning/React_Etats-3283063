import "./App.css";

const styles = {
  container: { width: "40%" },
};

function App() {
  // useState
  const increment = () => { };
  const decrement = () => { };

  return (
    <div className="container mt-5" style={styles.container}>
      <h1 className="text-center">Counter App</h1>
      <div className="App-border p-4">
        <p className="text-center text-primary h1 mb-2">0</p>
        <div className="d-flex justify-content-center mb-3">
          <button
            onClick={() => { }}
            className="App-button-50 btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => { }}
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

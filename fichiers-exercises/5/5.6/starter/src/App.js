import Form from "./components/Form";
import List from "./components/List";
import "./App.css";

const styles = {
  container: { width: "40%" },
  item_done: {
    textDecoration: "line-through",
    color: "gray",
    fontStyle: "italic",
  },
};

function App() {
  return (
    <div className="container mt-5 " style={styles.container}>
      <Form />
      <List styles={styles} />
    </div>
  );
}

export default App;

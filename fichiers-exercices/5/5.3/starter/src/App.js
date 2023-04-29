import { useMemo, useState, useRef } from "react";
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
  const ref = useRef();
  const [input, setInput] = useState("");
  const [isFiltered, filtering] = useState(false);
  const [items, setItems] = useState([]);
  const [all, setAll] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return false;
    }
    const newItem = {
      id: new Date().getMilliseconds(),
      task: input,
      done: false,
    };
    setAll([...items, newItem]);
    setItems([...items, newItem]);
    setInput("");
    ref.current.value = "";
  };
  const onChange = (e) => setInput(e.target.value);

  const show = (e) => filtering(e.target.checked);
  const check = (id) => {
    const updated = all.map((item) => {
      return item.id === id ? { ...item, done: !item.done } : item;
    });
    setAll(updated);
    setItems(updated);
  };
  const archive = () => {
    const updated = all.filter((item) => !item.done);
    setAll(updated);
    setItems(updated);
  };
  const isVisible = useMemo(() => items.some((item) => item.done), [items]);
  const allItems = useMemo(() => {
    if (isFiltered) {
      return all.filter((item) => item.done);
    }
    return all;
  }, [all, isFiltered]);
  return (
    <div className="container mt-5 " style={styles.container}>
      <Form
        ref={ref}
        submit={onSubmit}
        change={onChange}
        show={show}
        archive={archive}
        isVisible={isVisible}
      />
      <List check={check} items={allItems} styles={styles} />
    </div>
  );
}

export default App;

import { useState, useRef, useMemo, forwardRef } from "react";
import { atom, useRecoilState } from "recoil";
import "./App.css";

const styles = {
  container: { width: "40%" },
  item_done: {
    textDecoration: "line-through",
    color: "gray",
    fontStyle: "italic",
  },
};

const items = [
  { id: 1, task: "pay bills", done: false },
  { id: 2, task: "buy groceries", done: false },
  { id: 3, task: "learn Redux", done: false },
];

const itemsState = atom({
  key: "itemsState", // unique ID (with respect to other atoms/selectors)
  default: items, // default value (aka initial value)
});

const isFiltering = atom({
  key: "isFiltering", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const inputValue = atom({
  key: "inputValue", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

const Form = forwardRef(
  ({ isVisible, onSubmit, onChange, show, archive }, ref) => {
    return (
      <form onSubmit={onSubmit} className="mb-4">
        <input
          ref={ref}
          className="form-control mb-4"
          type="text"
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="d-flex justify-content-between">
          <div className="form-check">
            <input
              id="show"
              type="checkbox"
              className="form-check-input"
              onChange={show}
            />
            <label className="form-check-label" for="show">
              {" "}
              show completed
            </label>
          </div>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            style={{ visibility: `${isVisible ? "visible" : "hidden"} ` }}
            onClick={archive}
          >
            archive completed
          </button>
        </div>
      </form>
    );
  }
);

const List = () => {
  const [list, setList] = useRecoilState(itemsState);
  const [all, setAll] = useRecoilState(itemsState);
  const [isFiltered, filtering] = useRecoilState(isFiltering);

  const check = (id) => {
    const updated = all.map((item) => {
      return item.id === id ? { ...item, done: !item.done } : item;
    });
    setList(updated);
    setAll(updated);
  };

  const items = useMemo(() => {
    if (isFiltered) {
      return all.filter((item) => item.done);
    }
    return all;
  }, [all, isFiltered]);
  return (
    <ul>
      {items.map((item) => (
        <li
          style={item.done ? styles.item_done : {}}
          onClick={() => check(item.id)}
        >
          {item.task}
        </li>
      ))}
    </ul>
  );
};

function App() {
  const ref = useRef();
  const [list, setList] = useRecoilState(itemsState);
  const [all, setAll] = useRecoilState(itemsState);
  const [isFiltered, filtering] = useRecoilState(isFiltering);
  const [input, setInput] = useRecoilState(inputValue);

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
    setAll([...all, newItem]);
    setList([...list, newItem]);
    setInput("");
    ref.current.value = null;
  };
  const show = (e) => filtering(e.target.checked);

  const archive = () => {
    const all_filtered = all.filter((item) => !item.done);
    const filtered = list.filter((item) => !item.done);
    setList(filtered);
    setAll(all_filtered);
  };
  const check = (id) => {
    const updated = all.map((item) => {
      return item.id === id ? { ...item, done: !item.done } : item;
    });
    setList(updated);
    setAll(updated);
  };
  const isVisible = useMemo(() => {
    return all.some((item) => item.done);
  }, [all]);
  return (
    <div className="container mt-5 " style={styles.container}>
      <Form
        ref={ref}
        isVisible={isVisible}
        onSubmit={onSubmit}
        onChange={setInput}
        check={check}
        show={show}
        archive={archive}
      />
      <List />
    </div>
  );
}

export default App;

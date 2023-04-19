import { useRef } from "react";
import {
  atom,
  useRecoilState,
  useSetRecoilState,
  selector,
  useRecoilValue,
} from "recoil";
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

const itemsCountState = selector({
  key: "itemsCountState",
  get: ({ get }) => {
    const items = get(itemsState);

    if (!items.length) {
      return "";
    }
    return items.length === 1
      ? `${items.length} item`
      : `${items.length} items`;
  },
});

const visibilityState = selector({
  key: "itemsCountState",
  get: ({ get }) => {
    const items = get(itemsState);

    return items.some((item) => !!item.done);
  },
});

const allItemsState = selector({
  key: "list", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const all = get(itemsState);
    const bool = get(isFiltering);
    if (bool) {
      return all.filter((item) => item.done);
    }
    return all;
  },
});

const Form = () => {
  const [list, setList] = useRecoilState(itemsState);
  const [all, setAll] = useRecoilState(itemsState);
  const filtering = useSetRecoilState(isFiltering);
  const [input, setInput] = useRecoilState(inputValue);
  const isVisible = useRecoilValue(visibilityState);

  const ref = useRef();
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

  return (
    <form onSubmit={onSubmit} className="my-4">
      <input
        ref={ref}
        className="form-control mb-4"
        type="text"
        onChange={(e) => setInput(e.target.value)}
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
};

const List = () => {
  const [setList] = useSetRecoilState(itemsState);
  const [all, setAll] = useRecoilState(itemsState);
  const allItems = useRecoilValue(allItemsState);

  const check = (id) => {
    const updated = all.map((item) => {
      return item.id === id ? { ...item, done: !item.done } : item;
    });
    setList(updated);
    setAll(updated);
  };
  return (
    <ul>
      {allItems.map((item) => (
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
  const count = useRecoilValue(itemsCountState);
  return (
    <div className="container mt-5 " style={styles.container}>
      <span>{count}</span>
      <Form />
      <List />
    </div>
  );
}

export default App;

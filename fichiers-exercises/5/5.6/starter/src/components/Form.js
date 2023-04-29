import { useRef, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submit, show, archive } from "../redux/reducer";

const Form = () => {
  const ref = useRef();
  const [input, setInput] = useState();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.checklist);

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
    dispatch(submit(newItem));
    setInput("");
    ref.current.value = "";
  };

  const onChange = (e) => setInput(e.target.value);
  const isVisible = useMemo(() => items.some((item) => item.done), [items]);
  return (
    <form onSubmit={onSubmit} className="mb-4">
      <input
        ref={ref}
        className="form-control mb-4"
        type="text"
        onChange={onChange}
      />
      <div className="d-flex justify-content-between">
        <div className="form-check">
          <input
            id="show"
            type="checkbox"
            className="form-check-input"
            onChange={(e) => dispatch(show(e.target.checked))}
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
          onClick={() => dispatch(archive())}
        >
          archive completed
        </button>
      </div>
    </form>
  );
};
export default Form;

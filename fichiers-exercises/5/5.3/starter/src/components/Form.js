import { forwardRef } from "react";
const Form = forwardRef(({ submit, change, show, archive, isVisible }, ref) => {
  return (
    <form onSubmit={submit} className="mb-4">
      <input
        ref={ref}
        className="form-control mb-4"
        type="text"
        onChange={change}
      />
      <div className="d-flex justify-content-between">
        {isVisible && (
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
        )}
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
});
export default Form;

import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div
      className="d-flex justify-content-center flex-column align-items-center"
      style={{ height: "600px" }}
    >
      <div className="m-2 shadow p-5 bg-warning card align-items-center">
        <h1 className="text-danger">Counter</h1>
        <h1 className="text-white">{count}</h1>
        <button
          className="btn btn-primary"
          onClick={(e) => setCount(count + 1)}
        >
          Increase
        </button>
        <button className="btn btn-primary m-3" onClick={(e) => setCount(0)}>
          Reset
        </button>

        <button className="btn btn-primary m-2" onClick={(e) => setCount(0)}>
          Increase
        </button>
      </div>
    </div>
  );
};

export default Counter;

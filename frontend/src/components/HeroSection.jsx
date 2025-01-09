import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const buttons = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Fullstack Developer",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const searchButtonHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="text-center  shadow p-3 bg-dark rounded-4 mt-5 mb-3">
        <h6 className="fw-bold text-white">No. 1 job hunt website</h6>
      </div>
      <div className="text-center">
        <h1 style={{ fontSize: "35px" }}>
          Search, Apply & <br />
          Get Your <span className="text-primary">Dream Jobs</span>
        </h1>
        <p className="text-danger">
          Lorem ipsum dolor sit amet consecteur adipisicing elit. Aliquid
          aspernatur temporibus nihil tempora dolor!
        </p>
        <div class=" input-group input-group-sm mt-5">
          <input
            type="text"
            class="p-2 form-control rounded-start-pill"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search"
          />
          <button
            class="btn btn-secondary rounded-end-pill"
            type="button"
            onClick={searchJobHandler}
          >
            Search
          </button>
        </div>
      </div>
      <div className="button-con shadow rounded-5 mt-5">
        {buttons.map((button, index) => (
          <button
            className="btn btn-dark card-buuton m-5"
            onClick={() => searchButtonHandler(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

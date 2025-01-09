import { useDispatch, useSelector } from "react-redux";
import useGetAllJob from "../../hooks/useGetAllJob";
import Navbar from "../shared/Navbar";
import Job from "./Job";
import { useEffect } from "react";
import { setSearchedQuery } from "../../redux/jobSlice";

const Browse = () => {
  useGetAllJob();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  });

  return (
    <div>
      <Navbar />
      <div className="m-5">
        <h1>Search Results({allJobs.length}) </h1>
        <div className="d-flex row justify-content-center">
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;

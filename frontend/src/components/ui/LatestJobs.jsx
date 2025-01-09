import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="m-5">
      <h1 className="fw-bold mt-5 mb-5">
        <span className="text-primary">Latest & Top </span> Job Openings
      </h1>
      <div className="row d-flex justify-content-center">
        {allJobs.length <= 0 ? (
          <span>No job available</span>
        ) : (
          allJobs.map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;

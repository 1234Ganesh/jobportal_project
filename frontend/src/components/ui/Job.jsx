import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="col-12 shadow m-2 p-3 rounded-3">
      <div className="d-flex justify-content-between">
        <h4>
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </h4>
        <button style={{ backgroundColor: "#ffffff", border: "none" }}>
          <i className="bi bi-bookmark"></i>
        </button>
      </div>
      <div className="d-flex flex-row align-items-center">
        <img src={job?.company?.logo} width={60} height={60} />
        <div className="mt-4" style={{ marginLeft: "25px" }}>
          <h6>{job?.company?.name} </h6>
          <h6>india</h6>
        </div>
      </div>
      <div className="p-3">
        <h6 className="fw-bold">{job?.title}</h6>
        <p style={{ color: "grey" }}>{job?.description}</p>
        <div className="d-flex" style={{ flexWrap: "wrap" }}>
          <h6 className="badge text-bg-secondary m-1 p-2">
            {job?.position} Positions
          </h6>
          <h6 className="badge text-bg-secondary m-1 p-2">{job?.jobType}</h6>
          <p className="badge text-bg-secondary m-1 p-2">{job?.salary}LPA </p>
        </div>
        <div>
          <button
            className=" details-btn"
            onClick={() => navigate(`/description/${job?._id}`)}
          >
            Details
          </button>
          <button className="details-btn bg-primary text-white">
            Save For Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;

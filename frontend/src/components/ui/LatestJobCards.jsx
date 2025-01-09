import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      className="col-md-4 col-sm-6 align-items-center mb-2"
      onClick={() => navigate(`/description/${job._id}`)}
    >
      <div className="card">
        <div className="card-body">
          <h4 className="text-secondary">{job?.company?.name}</h4>
          <p className="text-success">India</p>
          <strong>{job?.title}</strong>
          <p className="text-dark"> {job?.description}</p>
          <div className="d-flex justify-content-around">
            <p className="badge text-bg-secondary">{job?.position}</p>
            <p className="badge text-bg-secondary">{job?.jobType}</p>
            <p className="badge text-bg-secondary">{job?.salary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;

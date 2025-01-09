import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs, setSingleJob } from "../../redux/jobSlice";
import toast from "react-hot-toast";
import { use } from "react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true); //update the local state
        const updateSingleJobs = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(singleJob(updateSingleJobs)); //helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); //Ensumre the state is sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  return (
    <div className="m-5 rounded-4">
      <div className="d-flex justify-content-between  p-3 align-items-center">
        <div>
          <h1>{singleJob?.title}</h1>
          <div className="d-flex" style={{ flexWrap: "wrap" }}>
            <h6 className="badges text-primary">
              {singleJob?.position} Position
            </h6>
            <h6 className="badges text-success">{singleJob?.jobType}</h6>
            <p className="badges text-secondary">{singleJob?.salary}LPA</p>
          </div>
        </div>
        <button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`${isApplied ? "btn btn-dark" : "btn btn-primary"}`}
        >
          {isApplied ? "Applied already" : "Apply Now"}
        </button>
      </div>
      <h4>Job Description</h4>
      <hr />
      <div className="p-2">
        <h5 className="fw-bold">
          Role : <span className="job-des-color">{singleJob?.title}</span>
        </h5>
        <h5 className="fw-bold">
          location :<span className="job-des-color">{singleJob?.location}</span>
        </h5>
        <h5 className="fw-bold">
          Description :{" "}
          <span className="job-des-color">{singleJob?.description}</span>
        </h5>
        <h5 className="fw-bold">
          Experience :{" "}
          <span className="job-des-color"> {singleJob?.experience}</span>
        </h5>
        <h5 className="fw-bold">
          Salary: <span className="job-des-color">{singleJob?.salary}LPA </span>
        </h5>
        <h5 className="fw-bold">
          Total Applicants:{" "}
          <span className="job-des-color">
            {" "}
            {singleJob?.applications?.length}
          </span>
        </h5>
        <h5 className="fw-bold">
          Posted Date:{" "}
          <span className="job-des-color">
            {" "}
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h5>
      </div>
    </div>
  );
};

export default JobDescription;

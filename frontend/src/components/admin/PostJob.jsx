import { useState } from "react";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === e.target.value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <Navbar />
      <form onSubmit={submitHandler} className="shadow rounded-5 m-5">
        <div className="row d-flex justify-content-center align-items-center m-5">
          <div className="col-sm-8 col-md-4 m-2">
            <label className="mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="form-control"
            />
          </div>
          <div className="col-sm-8 col-md-4 m-2">
            <label className="mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="form-control"
            />
          </div>
          <div className="col-sm-8 col-md-4 m-2">
            <label className="mb-2">Requirements</label>
            <input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="form-control"
            />
          </div>
          <div className="col-sm-10 col-md-4 m-2">
            <label className="mb-2">Salary</label>
            <input
              type="text"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="form-control"
            />
          </div>
          <div className="col-sm-8 col-md-4 m-2">
            <label className="mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="form-control"
            />
          </div>
          <div className="col-sm-8 col-md-4 m-2">
            <label className="mb-2">JobType</label>
            <input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="form-control"
            />
          </div>
          <div className="col-sm-8 col-md-4 m-2 mb-5">
            <label className="mb-2">Experience Level</label>
            <input
              type="text"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="form-control"
            />
          </div>
          <div className="col-sm-8 col-md-4 m-2 mb-5">
            <label className="mb-2">No of Position</label>
            <input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              className="form-control"
            />
          </div>
          {companies.length > 0 && (
            <div className="col-sm-6 mb-3">
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={selectChangeHandler}
              >
                <option selected>Open this select menu</option>
                {companies.map((company) => {
                  return (
                    <option value={company?.name?.toLowerCase()}>
                      {company.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {loading ? (
            <div className="spinner-border  m-5" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            <div className="col-sm-6 col-md-8">
              <button className="btn btn-dark text-white mb-5 w-100">
                Post New Job
              </button>
            </div>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a jobs
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostJob;

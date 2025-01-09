import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  });
  return (
    <div>
      <Navbar />
      <div>
        <div className="d-flex justify-content-between m-4">
          <div>
            <input
              type="text"
              placeholder="Filter by name, role"
              className="form-control"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            className="btn btn-dark text-white"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New jOBS
          </button>
        </div>
        <div className="m-4">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;

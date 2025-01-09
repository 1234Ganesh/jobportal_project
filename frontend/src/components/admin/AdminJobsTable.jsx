import { useState, useEffect } from "react";
import { Overlay, Popover } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filterJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filterJobs);
  }, [allAdminJobs, searchJobByText]);

  const [visiblePopoverId, setVisiblePopoverId] = useState(null);
  const [popoverTarget, setPopoverTarget] = useState(null);

  const handleClick = (event, companyId) => {
    // Set the target element for the popover
    setPopoverTarget(event.target);
    setVisiblePopoverId(visiblePopoverId === companyId ? null : companyId);
  };
  return (
    <div className="com-table-margin">
      <table className="table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Role</th>
            <th>Date</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs?.map((job) => (
            <tr key={job?.company?._id}>
              <td>{job?.company?.name}</td>
              <td>{job?.title}</td>
              <td>{job?.createdAt.split("T")[0]}</td>
              <td className="text-end">
                <div>
                  <button
                    onClick={(e) => handleClick(e, job._id)}
                    className="fs-6"
                  >
                    ...
                  </button>
                  <Overlay
                    show={visiblePopoverId === job._id}
                    target={popoverTarget}
                    element
                    placement="bottom"
                    containerPadding={10}
                  >
                    <Popover id="popover-contained" style={{ width: "120px" }}>
                      <div
                        className="d-flex p-2"
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                      >
                        <i className="bi bi-pen m-2"></i>
                        <h6 className="text-dark m-2">Edit</h6>
                      </div>
                      <div
                        className="d-flex p-2 align-items-center"
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                      >
                        <i className="bi bi-eye"></i>
                        <h6 className="text-dark m-2">Applicants</h6>
                      </div>
                    </Popover>
                  </Overlay>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5 className="text-center mt-5">List of your recent posted jobs</h5>
    </div>
  );
};

export default AdminJobsTable;

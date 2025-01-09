import { useState } from "react";
import Navbar from "../shared/Navbar";
import AppliendJobTable from "./AppliendJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../../hooks/useGetAppliedJobs";

const skills = ["HTML", "CSS", "Javascript", "ReactJs"];
const isResume = true;
const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-column col-10 m-5 shadow p-3">
          <div className="d-flex p-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/76/GK-Logo-400x400.png"
              width={60}
              height={60}
              className="m-3"
            />
            <div className="m-3">
              <h4>{user?.fullName}</h4>
              <p style={{ color: "lightgrey" }}>{user?.profile?.bio}</p>
            </div>
            <button onClick={() => setOpen(true)}>
              <i className="bi bi-pen m-3"></i>
            </button>
          </div>
          <div className="d-flex pl-3">
            <i class="bi bi-envelope m-2"></i>
            <p className="m-2">{user?.email}</p>
          </div>
          <div className="d-flex pl-3">
            <i class="bi bi-telephone"></i>
            <p className="m-2">{user?.phoneNumber}</p>
          </div>
          <div className="p-2">
            <h6>Skills</h6>
            <div className="d-flex flex-wrap">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <h4 className="badge text-bg-secondary m-2">{item}</h4>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
          <div>
            <strong className="fw-bold">Resume</strong>
            <br />
            <a target="blank" href={user?.profile?.resume}>
              {user?.profile?.resumeOriginalName}
            </a>
          </div>
        </div>
      </div>
      <div>
        <h4 className="m-5">Appliend jobs</h4>
        <AppliendJobTable />
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};
export default Profile;

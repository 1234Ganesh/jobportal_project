import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="bg-light d-flex justify-content-between">
        <div className="m-5">
          <h1>
            Job <span className="text-danger">Portal</span>
          </h1>
        </div>
        <div className="d-flex flex-row align-items-center">
          <ul className="list-unstyled d-flex">
            {user && user.role === "recruiter" ? (
              <>
                <li className="m-2 fs-5">
                  <Link className="nav-link" to="/admin/companies">
                    Companies
                  </Link>
                </li>
                <li className="m-2 fs-5">
                  <Link className="nav-link" to="/admin/jobs">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="m-2 fs-5">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="m-2 fs-5">
                  <Link className="nav-link" to="/jobs">
                    Jobs
                  </Link>
                </li>
                <li className="m-2 fs-5">
                  <Link className="nav-link" to="/browse">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-warning m-2">Signup</button>
              </Link>
            </div>
          ) : (
            <div>
              <div>
                <button onClick={toggleModal}>
                  <img
                    src={user?.profile?.profilePhoto}
                    width="45px"
                    alt="profile-photo"
                    height="50px"
                    style={{
                      backgroundColor: "lightpink",
                      borderRadius: "30%",
                    }}
                    onClick={toggleModal}
                  />
                </button>
              </div>
              {showModal && (
                <div
                  className="d-flex justify-content-end"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="card shadow p-2 position-absolute">
                    <h4 className="text-success">{user?.fullName}</h4>
                    <p className="text-primary">{user?.profile?.bio}</p>

                    <div className="d-flex flex-column align-items-start">
                      <button>
                        <Link
                          to="/profile"
                          style={{
                            textDecoration: "none",
                            color: "darkmagenta",
                          }}
                        >
                          <span className="m-3">
                            <i className="bi bi-person-circle"></i>
                          </span>
                          User Profile
                        </Link>
                      </button>

                      <button onClick={logoutHandler}>
                        <Link
                          to="/login"
                          style={{
                            textDecoration: "none",
                            color: "darkmagenta",
                          }}
                        >
                          <span className="m-3">
                            <i class="bi bi-box-arrow-right"></i>
                          </span>
                          Logout
                        </Link>
                      </button>

                      <br />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

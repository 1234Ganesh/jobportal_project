import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";
import toast from "react-hot-toast";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const handleShow = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <div>
      {open && (
        <div
          className="d-flex justify-content-center align-items-center modal"
          tabIndex="-1"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <form onSubmit={submitHandler}>
            <div className="modal-dialog p-5" style={{ width: "500px" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleClose}
                  ></button>
                </div>

                <div className="d-flex flex-column modal-body align-items-center">
                  <div className="d-flex">
                    <label htmlFor="name" className="m-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="fullName"
                      value={input.fullName}
                      onChange={changeEventHandler}
                      className="form-control m-2"
                    />
                  </div>
                  <div className="d-flex">
                    <label htmlFor="email" className="m-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={changeEventHandler}
                      value={input.email}
                      className="form-control m-2"
                    />
                  </div>
                  <div className="d-flex">
                    <label htmlFor="number" className="m-2 text-rigth">
                      Number
                    </label>
                    <input
                      type="number"
                      id="number"
                      name="phoneNumber"
                      onChange={changeEventHandler}
                      value={input.phoneNumber}
                      className="form-control m-2"
                    />
                  </div>
                  <div className="d-flex">
                    <label htmlFor="bio" className="m-2">
                      Bio
                    </label>
                    <input
                      type="text"
                      id="bio"
                      name="bio"
                      onChange={changeEventHandler}
                      value={input.bio}
                      className="form-control m-2"
                    />
                  </div>
                  <div className="d-flex">
                    <label htmlFor="skills" className="m-2">
                      Skills
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      onChange={changeEventHandler}
                      value={input.skills}
                      className="form-control m-2"
                    />
                  </div>
                  <div className="d-flex">
                    <label htmlFor="file" className="m-2">
                      Resume
                    </label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      accept="application/pdf"
                      onChange={fileChangeHandler}
                      className="form-control m-2"
                    />
                  </div>
                  {loading ? (
                    <div className="spinner-border  m-5" role="status">
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    <button className="w-100 btn btn-success">Update</button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;

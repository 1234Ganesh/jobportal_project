
import Navbar from "../shared/Navbar";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { USER_API_END_POINT } from "../../utils/constant";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //formdata object
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } 
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="container">
      <Navbar />
      <div className="row d-flex justify-content-center">
        <div className="col-sm-12 col-md-6 p-2 mt-5">
          <div className="shadow p-3" style={{ borderRadius: "20px" }}>
            <form onSubmit={submitHandler}>
              <div>
                <strong>Full Name</strong>
                <input
                  type="text"
                  name="fullName"
                  value={input.fullName}
                  onChange={changeEventHandler}
                  className="form-control"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <strong>Email</strong>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <strong>Phone Number</strong>
                <input
                  type="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="form-control"
                  placeholder="Enter your phonenumber"
                />
              </div>
              <div>
                <strong>Password</strong>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <div className="d-flex" style={{ flexWrap: "wrap" }}>
                <div className="m-3 form-check">
                  <input
                    type="radio"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="form-check-input"
                    name="role"
                    value="student"
                  />
                  <strong>Student</strong>
                </div>
                <div className="m-3 form-check">
                  <input
                    type="radio"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="form-check-input"
                    name="role"
                    value="recruiter"
                  />
                  <strong>Recruiter</strong>
                </div>
                <div className="m-3">
                  <strong>Profile</strong>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={changeFileHandler}
                  />
                </div>
              </div>
             
                <div className="d-grid gap-5">
                  <button className="btn btn-warning">Signup</button>
                </div>
            

              <p className="mt-3">
                Already have an account? <span></span>
                <Link to="/Login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

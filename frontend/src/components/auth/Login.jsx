import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {  setUser } from "../../redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
    
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } 
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="container">
      <Navbar />
      <div className="row d-flex justify-content-center">
        <div className="col-sm-12 col-md-6 p-2 mt-5">
          <div className="shadow p-3" style={{ borderRadius: "20px" }}>
            <form onSubmit={submitHandler}>
              <div>
                <strong>Email</strong>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <strong>Password</strong>
                <input
                  type="text"
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
                    className="form-check-input"
                    name="role"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    value="student"
                  />
                  <strong>Student</strong>
                </div>
                <div className="m-3 form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    name="role"
                    value="recruiter"
                  />
                  <strong>Recruiter</strong>
                </div>
                <br />
              </div>
              
                <div className="d-grid gap-5">
                  <button className="btn btn-warning">Login</button>
                </div>
            

              <p className="mt-3">
                Don't have an account? <span></span>
                <Link to="/signup">Signup</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";
import { COMPANY_API_END_POINT } from "../../utils/constant";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-center">
        <div className="align-items-center">
          <div className="d-flex gap-4 mb-4">
            <button
              className="back-btn"
              onClick={() => navigate("/admin/companies")}
            >
              <span>
                <i className="bi bi-arrow-left"></i>
              </span>
              Back
            </button>
            <h2>Company Setup</h2>
          </div>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <h6>Company Name</h6>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={changeEventHandler}
                value={input.name}
              />
            </div>
            <div className="mb-3">
              <h6>Description</h6>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={changeEventHandler}
                value={input.description}
              />
            </div>
            <div className="mb-3">
              <h6>Website</h6>
              <input
                type="text"
                name="website"
                className="form-control"
                onChange={changeEventHandler}
                value={input.website}
              />
            </div>
            <div className="mb-3">
              <h6>Location</h6>
              <input
                type="text"
                name="location"
                className="form-control"
                onChange={changeEventHandler}
                value={input.location}
              />
            </div>
            <div className="mb-3">
              <h6>Logo</h6>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
            {loading ? (
              <div className="spinner-border  m-5" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <div>
                <button className="w-100 btn btn-success">Update</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;

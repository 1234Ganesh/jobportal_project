import axios from "axios";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();

  const [companyName, setCompnayName] = useState();
  const dispatch = useDispatch();
  const registerNewCompnay = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-center m-4">
        <div>
          <div className="mb-4">
            <h1>Your Company Name</h1>
            <p>
              What would you like to give your company name? you can change this
              later
            </p>
          </div>
          <div>
            <h4>Compnay Name</h4>
            <input
              type="text"
              placeholder="JobHunt,Microsoft etc."
              className="form-control"
              onChange={(e) => setCompnayName(e.target.value)}
            />
            <div className="mt-4">
              <button
                className="tran-btn"
                onClick={() => navigate("/admin/companies")}
              >
                Cancel
              </button>
              <button
                className="btn btn-dark text-white"
                onClick={registerNewCompnay}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;

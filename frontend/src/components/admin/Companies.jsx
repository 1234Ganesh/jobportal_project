import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyBytext } from "../../redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyBytext(input));
  });
  return (
    <div>
      <Navbar />
      <div>
        <div className="d-flex justify-content-between m-4">
          <div>
            <input
              type="text"
              placeholder="Filter by name"
              className="form-control"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            className="btn btn-dark text-white"
            onClick={() => navigate("/admin/companies/create")}
          >
            New Company
          </button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;

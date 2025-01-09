import { useState, useRef, useEffect } from "react";
import { Overlay, Popover } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, serachCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!serachCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(serachCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, serachCompanyByText]);

  const ref = useRef(null);

  const [visiblePopoverId, setVisiblePopoverId] = useState(null);
  const [popoverTarget, setPopoverTarget] = useState(null);

  const handleClick = (event, companyId) => {
    // Set the target element for the popover
    setPopoverTarget(event.target);
    setVisiblePopoverId(visiblePopoverId === companyId ? null : companyId);
  };
  return (
    <div className="com-table-margin">
      <h5>List of your recent registered companies</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Date</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterCompany?.map((company) => (
            <tr key={company._id}>
              <td>
                <img
                  src={company.logo}
                  width={60}
                  height={60}
                  alt="Company Logo"
                />
              </td>
              <td>{company.name}</td>
              <td>{company.createdAt.split("T")[0]}</td>
              <td className="text-end">
                <div>
                  <button
                    onClick={(e) => handleClick(e, company._id)}
                    className="fs-6"
                  >
                    ...
                  </button>
                  <Overlay
                    show={visiblePopoverId === company._id}
                    target={popoverTarget} // Use the specific target element
                    placement="bottom"
                    containerPadding={10} // Optional: Adjust padding for better alignment
                  >
                    <Popover id="popover-contained" style={{ width: "120px" }}>
                      <div
                        className="d-flex p-2"
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                      >
                        <i className="bi bi-pen m-2"></i>
                        <h6 className="text-dark m-2">Edit</h6>
                      </div>
                    </Popover>
                  </Overlay>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;

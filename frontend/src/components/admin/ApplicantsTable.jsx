import axios from "axios";
import { useState } from "react";
import { Overlay, Popover } from "react-bootstrap";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const shortListStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [visiblePopoverId, setVisiblePopoverId] = useState(null);
  const [popoverTarget, setPopoverTarget] = useState(null);

  const handleClick = (event, applicantId) => {
    setPopoverTarget(event.target);
    setVisiblePopoverId(visiblePopoverId === applicantId ? null : applicantId);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Resume</th>
            <th>Date</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <td>{item?.applicant?.fullName} Name</td>
                <td>{item?.applicant?.email}</td>
                <td>{item?.applicant?.phoneNumber}</td>
                <td>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </td>
                <td>{item?.applicant.createdAt.split("T")[0]}</td>
                <td className="text-end">
                  <div>
                    <button
                      onClick={(e) => handleClick(e, item._id)}
                      className="fs-6"
                    >
                      ...
                    </button>
                    <Overlay
                      show={visiblePopoverId === item._id}
                      target={popoverTarget}
                      placement="bottom"
                      containerPadding={10}
                    >
                      <Popover
                        id={`popover-${item._id}`}
                        style={{ width: "120px" }}
                      >
                        <div className="p-3">
                          {shortListStatus.map((status, index) => (
                            <div
                              key={index}
                              onClick={() => statusHandler(status, item?._id)}
                            >
                              <span>{status}</span>
                            </div>
                          ))}
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

export default ApplicantsTable;

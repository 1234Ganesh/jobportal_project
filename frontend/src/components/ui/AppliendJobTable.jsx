import { useSelector } from "react-redux";

const AppliendJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="com-table-margin">
      <h1>Aapplied jobs</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Job Role</th>
            <th>Comapny</th>
            <th className="text-danger">Status</th>
          </tr>
        </thead>
        <tbody>
          {allAppliedJobs.length <= 0 ? (
            <span>You haven't applied any job yet.</span>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <tr key={appliedJob._id}>
                <td>{appliedJob?.createdAt?.split("T")[0]}</td>
                <td>{appliedJob.job.title}</td>
                <td>{appliedJob.job.company.name}</td>
                <td>
                  <h1
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "badge text-bg-danger p-2"
                        : appliedJob?.status === "pending"
                        ? "badge text-bg-secondary p-2"
                        : "badge text-bg-success p-2"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </h1>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppliendJobTable;

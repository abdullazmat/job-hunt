import React from "react";

function AppliedJobsTable({ appliedJobs }) {
  return (
    <div className="container-fluid mt-5">
      <div className="table-responsive">
        <h5 className="fw-bold">Applied Jobs</h5>
        <table className="table table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Job Role</th>
              <th scope="col">Company</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.length > 0 ? (
              appliedJobs.map((job, index) => (
                <tr key={index}>
                  <td style={{ whiteSpace: "nowrap" }} className="text-center">
                    {job?.createdAt.split("T")[0]}
                  </td>
                  <td className="text-center">{job?.job?.title}</td>
                  <td className="text-center">{job?.job?.company?.name}</td>
                  <td
                    className={`badge mt-1 text-center ${
                      job?.status === "accepted"
                        ? "text-bg-success"
                        : job?.status === "rejected"
                        ? "text-bg-danger"
                        : "text-bg-dark"
                    }`}
                  >
                    {job?.status.charAt(0).toUpperCase()}
                    {job?.status.slice(1)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Applied Jobs
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppliedJobsTable;

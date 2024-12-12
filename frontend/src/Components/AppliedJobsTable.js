import React from "react";

function AppliedJobsTable() {
  return (
    <div className="container mt-5">
      <h5 className="fw-bold">Applied Jobs</h5>
      <table class="table mt-4">
        <thead className="table-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Job Role</th>
            <th scope="col">Company</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((item, index) => (
            <tr key={index}>
              <td>12/12/2024</td>
              <td>Frontend Developer</td>
              <td>Google</td>
              <td className="badge text-bg-danger mt-1 ">Rejected</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppliedJobsTable;

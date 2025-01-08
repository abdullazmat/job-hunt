import React from "react";
import { faPen, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AdminJobsTable({ jobs }) {
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(jobs);
  const { searchJobText } = useSelector((state) => state.company);

  useEffect(() => {
    const filteredJobs =
      jobs.length >= 0 &&
      jobs.filter((job) => {
        if (!searchJobText) {
          return true;
        }
        return job?.title?.toLowerCase().includes(searchJobText.toLowerCase());
      });
    setFilterJobs(filteredJobs);
  }, [jobs, searchJobText]);

  console.log("Jobs Array Rendered on Table:", filterJobs);

  return (
    <div className="container ">
      <table className="table mt-4">
        <thead className="text-center">
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Applicants</th>
            <th scope="col">Role</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs?.length > 0 ? (
            filterJobs.map((job, index) => (
              <tr key={index}>
                <td className="text-center">{job?.title}</td>
                <td className="text-center">{job?.applications.length}</td>
                <td className="text-center">{job?.jobType}</td>
                <td className="text-center">{job?.createdAt.split("T")[0]}</td>
                <td className=" mt-1  text-center">
                  <FontAwesomeIcon
                    icon={faPen}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/admin/jobs/update/${job?._id}`)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center  text-danger">
                No Jobs Added
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminJobsTable;

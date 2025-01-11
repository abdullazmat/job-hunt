import React from "react";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../../Utils/constant";
import { useDispatch } from "react-redux";
import { setAdminJobs } from "../../Redux/jobSlice";

function AdminJobsTable({ jobs }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filterJobs, setFilterJobs] = useState([]);
  const { searchJobText } = useSelector((state) => state.job);

  const [error, setError] = useState(false);

  useEffect(() => {
    const filteredJobs =
      Array.isArray(jobs) && jobs.length > 0
        ? jobs.filter((job) => {
            if (!searchJobText) {
              return true;
            }
            return (
              job?.title?.toLowerCase().includes(searchJobText.toLowerCase()) ||
              job?.company?.name
                ?.toLowerCase()
                .includes(searchJobText.toLowerCase())
            );
          })
        : [];
    setFilterJobs(filteredJobs);
  }, [jobs, searchJobText]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `${APPLICATION_API_END_POINT}/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        setSucess(true);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const getJobApplicationsIds = async (id) => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        const jobApplications = res.data.job.applications;
        console.log("Job Applications", jobApplications);

        if (Array.isArray(jobApplications) && jobApplications.length > 0) {
          const jobApplicationIds = jobApplications.map(
            (application) => application._id
          );
          console.log("Job Application IDs", jobApplicationIds);

          // Delete applications concurrently
          await Promise.all(
            jobApplicationIds.map((id) => deleteApplication(id))
          );
        } else {
          console.log("No applications found for the job.");
        }
      } else {
        console.log("Failed to fetch job applications:", res?.data?.message);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await getJobApplicationsIds(id);
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        const updatedJobs = jobs.filter((job) => job._id !== id);
        dispatch(setAdminJobs(updatedJobs));
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="container ">
      <table className="table mt-4">
        <thead className="text-center">
          <tr>
            <th scope="col">Company</th>
            <th scope="col">Applicants</th>
            <th scope="col">Title</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs && filterJobs.length > 0 ? (
            filterJobs.map((job, index) => (
              <tr key={index}>
                <td className="text-center">{job?.company?.name}</td>
                <td className="text-center">{job?.applications.length}</td>
                <td className="text-center">{job?.title}</td>
                <td className=" mt-1  text-center">
                  <FontAwesomeIcon
                    icon={faPen}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/admin/jobs/update/${job?._id}`)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="  ms-3"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteJob(job?._id)}
                  />
                  <FontAwesomeIcon
                    icon={faEye}
                    className="  ms-3"
                    style={{ color: "green", cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/admin/jobs/applicants/${job?._id}`)
                    }
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

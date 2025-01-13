import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../../Utils/constant";
import { useDispatch } from "react-redux";
import { setJobApplications } from "../../Redux/applicationsSlice";
import { useSelector } from "react-redux";
import JobApplicantsTable from "./JobApplicantsTable";
import { useState } from "react";
import NotFound from "../shared/notFound";

function JobApplicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { jobApplications } = useSelector((state) => state.applications);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getJobApplications = async (id) => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const jobApplications = res?.data?.job?.applications;
          console.log("jobApplications", jobApplications);
          dispatch(setJobApplications(jobApplications));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getJobApplications(params.id);
  }, []);

  if (user?.role !== "recruiter") {
    return <NotFound />;
  }

  return (
    <div className="container">
      <div className="p-3 mt-5 text-dark">
        <h2 className="text-start">
          Job Applicants (
          <span className="text-danger">{jobApplications.length}</span>)
        </h2>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <JobApplicantsTable jobApplications={jobApplications} />
      )}
    </div>
  );
}

export default JobApplicants;

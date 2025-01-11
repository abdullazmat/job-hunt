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

function JobApplicants() {
  const params = useParams();
  const dispatch = useDispatch();

  const { jobApplications } = useSelector((state) => state.applications);

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
      }
    };
    getJobApplications(params.id);
  }, []);

  return (
    <div className="container">
      <div className="p-3 mt-5 text-dark">
        <h2 className="text-start">
          Job Applicants (
          <span className="text-danger">{jobApplications.length}</span>)
        </h2>
      </div>
      <JobApplicantsTable jobApplications={jobApplications} />
    </div>
  );
}

export default JobApplicants;

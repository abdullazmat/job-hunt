import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  JOB_API_END_POINT,
  APPLICATION_API_END_POINT,
} from "../Utils/constant";
import { useDispatch } from "react-redux";
import { setJobDesc } from "../Redux/jobSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "../Components/shared/notFound";
import useGetCompanyData from "../Hooks/useGetCompanyData";
import { Link } from "react-router-dom";

function JobDescription() {
  const naivgate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params?.id;

  const { user } = useSelector((state) => state.auth);
  const { jobDesc } = useSelector((state) => state.job);
  const { companyData } = useSelector((state) => state.company);

  const isApplied = jobDesc?.applications
    .map((app) => app?.applicant?._id)
    .includes(user?._id);

  const applyJobHandler = async () => {
    try {
      const response = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const updatedJob = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          {
            withCredentials: true,
          }
        );
        if (updatedJob.data.success) {
          dispatch(setJobDesc(updatedJob.data.job));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      naivgate("/login");
      return;
    }
    try {
      const getjob = async () => {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setJobDesc(response.data.job));
        }
      };
      getjob();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        naivgate("/login");
      }
    }
  }, [jobId, dispatch, user?._id]);

  if (user?.role !== "student") {
    return <NotFound />;
  }

  useGetCompanyData(jobDesc?.company, [jobDesc?.company]);

  return (
    <div className="container border p-3 p-md-5">
      <div className="d-flex justify-content-between">
        <h4 className="fw-bold p-0 m-0">Job Description</h4>
        <button
          disabled={isApplied}
          onClick={isApplied ? null : applyJobHandler}
          className={`badge text-bg-${
            isApplied ? "primary" : "dark"
          } d-flex justify-content-center align-items-center`}
        >
          {isApplied ? "Already Applied" : "Apply Now "}
        </button>
      </div>
      <div>
        <div className="d-flex flex-wrap gap-2 mt-4 ">
          <p
            className=" fw-bold mb-2 px-2  px-xl-3"
            style={{
              color: "blue",
              backgroundColor: "#F3F4F6",
              fontSize: ".7rem",
            }}
          >
            {jobDesc?.position} Positions
          </p>
          <p
            className="  fw-bold mb-2 px-2  px-xl-3"
            style={{
              color: "#f83002",
              backgroundColor: "#F3F4F6",
              fontSize: ".7rem",
            }}
          >
            {jobDesc?.jobType}
          </p>
          <p
            className=" fw-bold mb-2 px-2 px-xl-3"
            style={{
              color: "#6A38C2",
              backgroundColor: "#F3F4F6",
              fontSize: ".7rem",
            }}
          >
            {jobDesc?.salary} PKR
          </p>
        </div>
      </div>
      <div>
        <div className="d-flex mt-4">
          <p className="fw-bold">Company: </p>
          <Link
            className="ms-2"
            style={{ textDecoration: "none" }}
            to={`/company/description/${jobDesc?.company}`}
          >
            {companyData?.name}
          </Link>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Role: </p>
          <p className="ms-2">{jobDesc?.title}</p>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Location: </p>
          <p className="ms-2">{jobDesc?.location}</p>
        </div>
        <div className="mt-2">
          <p className="fw-bold">Description: </p>
          <p className="">{jobDesc?.description}</p>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Experience: </p>
          <p className="ms-2">{`${
            jobDesc?.experienceLevel === 1
              ? "1 Year"
              : jobDesc?.experienceLevel + " Years"
          }`}</p>
        </div>

        <div className="d-flex mt-2">
          <p className="fw-bold">Total Applicants: </p>
          <p className="ms-2">{jobDesc?.applications?.length}</p>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Listed: </p>
          <p className="ms-2">{jobDesc?.updatedAt.split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../../Utils/constant";
import { useDispatch } from "react-redux";
import { setJobDesc } from "../../Redux/jobSlice";

const FilterJobCards = ({ id, job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const isApplied = job?.applications
    .map((app) => app.applicant)
    .includes(user?._id);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const getjob = async () => {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
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
        navigate("/login");
      }
    }
  }, [id, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const response = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const updatedJob = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (updatedJob.data.success) {
          dispatch(setJobDesc(updatedJob.data.job));
        }
        console.log("Job Aplly Function:", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const daysAgoFunction = (createdAtTime) => {
    const currentTime = new Date();
    const createdAt = new Date(createdAtTime);
    const difference = currentTime - createdAt;
    const daysAgo = Math.floor(difference / (1000 * 3600 * 24));
    return daysAgo;
  };

  return (
    <div
      className="card  shadow-lg bg-body-tertiary rounded mt-3"
      style={{ border: "none" }}
    >
      <div className="mt-3 d-flex align-items-center justify-content-between px-3">
        <p className="m-0 p-0">
          <i className="fw-semibold">
            {daysAgoFunction(job.createdAt) === 0
              ? "Today"
              : daysAgoFunction(job.createdAt) === 1
              ? "1 day ago"
              : `${daysAgoFunction(job.createdAt)} days ago`}
          </i>
        </p>
        <FontAwesomeIcon
          icon={faBars}
          className="mb-0 ms-4 "
          style={{ color: "black" }}
        />
      </div>
      <div className="d-flex align-items-center mt-3 ms-3">
        <div>
          <img
            src={
              job?.company?.logo
                ? job?.company?.logo
                : "/DefaultCompanyLogo.png"
            }
            width={30}
          ></img>
        </div>
        <div>
          <p className="ms-2 p-0 m-0">{job?.company?.name}</p>
          <p
            className=" ms-2 p-0 m-0 fw-semibold"
            style={{ fontSize: "0.7rem" }}
          >
            {job?.location}
          </p>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title text-start fw-bold">{job?.title}</h5>
        <p className="card-text text-start">
          {job?.description?.split(" ").length >= 7
            ? `${job.description.split(" ").slice(0, 7).join(" ")} ......`
            : job?.description}
        </p>

        <div className="d-flex flex-wrap gap-2 justify-content-center ">
          <p
            className=" fw-bold mb-2 px-2  px-xl-3"
            style={{
              color: "blue",
              backgroundColor: "#F3F4F6",
              fontSize: ".7rem",
            }}
          >
            {job?.position} Positions
          </p>
          <p
            className="  fw-bold mb-2 px-2  px-xl-3"
            style={{
              color: "#f83002",
              backgroundColor: "#F3F4F6",
              fontSize: ".7rem",
            }}
          >
            {job?.jobType}
          </p>
          <p
            className=" fw-bold mb-2 px-2 px-xl-3"
            style={{
              color: "#6A38C2",
              backgroundColor: "#F3F4F6",
              fontSize: ".7rem",
            }}
          >
            {job?.salary} PKR
          </p>
        </div>
        <div className="d-flex mt-3 ">
          <button
            className="btn px-3 ms-2 filter-job-detail-btn btn-outline-dark fw-bold"
            style={{ color: "black" }}
            onClick={() => {
              navigate(`/job/description/${id}`);
            }}
          >
            Details
          </button>
          <button
            disabled={isApplied}
            className="btn ms-5 filter-job-apply-btn px-3"
            style={{ backgroundColor: "#6A38C2", color: "white" }}
            onClick={isApplied ? null : applyJobHandler}
          >
            {isApplied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterJobCards;

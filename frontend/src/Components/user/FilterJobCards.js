import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const FilterJobCards = ({ id, job }) => {
  const navigate = useNavigate();

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
              : daysAgoFunction(job.createdAt)}{" "}
            days ago
          </i>
        </p>
        <FontAwesomeIcon
          icon={faBookmark}
          className="mb-0 ms-4 bookmark-icon"
          style={{ color: "black" }}
        />
      </div>
      <div className="d-flex align-items-center mt-3">
        <div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/008/214/517/non_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"
            alt={job?.company?.name}
            className="img-fluid"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div>
          <p className="ms-2 p-0 m-0">{job?.company?.name}</p>
          <p
            className=" ms-2 p-0 m-0 fw-semibold"
            style={{ fontSize: "0.7rem" }}
          >
            Pakistan
          </p>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title text-start fw-bold">{job?.title}</h5>
        <p className="card-text text-start">{job?.description}</p>
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
            {job?.salary}
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
            className="btn ms-5 filter-job-apply-btn px-3"
            style={{ backgroundColor: "#6A38C2", color: "white" }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterJobCards;

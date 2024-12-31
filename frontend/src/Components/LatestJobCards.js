import React from "react";

const LatestJobCards = ({ job }) => {
  return (
    <div
      className="card px-3 shadow-lg bg-body-tertiary rounded mt-3"
      style={{ width: "25rem", border: "none" }}
    >
      <h4 className="mt-4">{job?.company?.name}</h4>
      <div className="card-body">
        <p className="text-start">Pakistan</p>
        <h5 className="card-title text-start fw-bold">{job?.title}</h5>
        <p className="card-text text-start">{job?.description}</p>
        <div className="d-flex justify-content-center ">
          <p
            className=" fw-bold mb-2 px-2 px-xl-3"
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
      </div>
    </div>
  );
};

export default LatestJobCards;

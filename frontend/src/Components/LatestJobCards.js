import React from "react";

const LatestJobCards = () => {
  return (
    <div
      className="card px-3 shadow-lg bg-body-tertiary rounded mt-3"
      style={{ width: "25rem", border: "none" }}
    >
      <h4 className="mt-4">Company Name</h4>
      <div className="card-body">
        <p className="text-start">Pakistan</p>
        <h5 className="card-title text-start fw-bold">Job Title</h5>
        <p className="card-text text-start">
          Some quick example text to build on the job title and make up the bulk
          of the card's content.
        </p>
        <div className="d-flex justify-content-center ">
          <p
            className=" fw-bold mb-2 px-2 px-xl-3"
            style={{
              color: "blue",
              backgroundColor: "#F3F4F6",
              fontSize: ".7rem",
            }}
          >
            2 Positions
          </p>
          <p
            className="  fw-bold mb-2 px-2  px-xl-3"
            style={{
              color: "#f83002",
              backgroundColor: "#F3F4F6",
              fontSize: ".7rem",
            }}
          >
            PartTime
          </p>
          <p
            className=" fw-bold mb-2 px-2 px-xl-3"
            style={{
              color: "#6A38C2",
              backgroundColor: "#F3F4F6",
              fontSize: ".7rem",
            }}
          >
            12LPA
          </p>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;

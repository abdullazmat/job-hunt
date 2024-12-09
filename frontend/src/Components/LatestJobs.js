import React from "react";
import LatestJobCards from "./LatestJobCards";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function LatestJobs() {
  return (
    <div className="container mt-5 text-center p-5">
      <h1 className="fw-bold" style={{ color: "#020817" }}>
        <span style={{ color: "#6A38C2" }}>Latest</span> Job Openings
      </h1>
      <div className="row mx-auto d-flex justify-content-center">
        {randomJobs.slice(0, 6).map((job, index) => (
          <div
            key={index}
            className="col-sm-12 col-md-6 col-lg-4 mt-4 d-flex justify-content-center"
          >
            <LatestJobCards />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;

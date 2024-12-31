import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="container mt-5 text-center p-5">
      <h1 className="fw-bold" style={{ color: "#020817" }}>
        <span style={{ color: "#6A38C2" }}>Latest</span> Job Openings
      </h1>
      <div className="row mx-auto d-flex justify-content-center">
        {allJobs.length <= 0 ? (
          <div className="mx-auto">No Jobs Available</div>
        ) : (
          allJobs?.slice(0, 6).map((job, index) => (
            <div
              key={index}
              className="col-sm-12 col-md-6 col-lg-4 mt-4 d-flex justify-content-center"
            >
              <LatestJobCards key={job._id} job={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LatestJobs;

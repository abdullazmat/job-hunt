import React from "react";
import FilterJobCards from "../Components/user/FilterJobCards";
import { useSelector } from "react-redux";

function Browse() {
  const { allJobs } = useSelector((state) => state.job);

  return (
    <div className="container">
      <div className="col-12 col-md-12 py-4">
        <h2 className="ms-3" style={{ color: "#020817" }}>
          Search Results ({allJobs.length}):
        </h2>
        <div>
          {allJobs && (
            <div className="row g-3">
              {allJobs.map((job, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12 ">
                  <FilterJobCards id={job._id} job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Browse;

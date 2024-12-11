import React from "react";
import FilterJobCards from "../Components/FilterJobCards";

const filterJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Browse() {
  return (
    <div className="container">
      <div className="col-12 col-md-12 py-4">
        <h2 className="ms-3" style={{ color: "#020817" }}>
          Search Results ({filterJobs.length}):
        </h2>
        <div>
          {filterJobs && (
            <div className="row g-3">
              {filterJobs.map((job, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12 ">
                  <FilterJobCards />
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

import React from "react";

function JobDescription() {
  const isApplied = true;
  return (
    <div className="container border p-3 p-md-5">
      <div className="d-flex justify-content-between">
        <h4 className="fw-bold p-0 m-0">FrontEnd Developer</h4>
        <button
          disabled={isApplied}
          class={`badge text-bg-${
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
      <div>
        <h5 className="mt-4">Job Description</h5>
        <div className="d-flex mt-4">
          <p className="fw-bold">Role: </p>
          <p className="ms-2">FrontEnd Developer</p>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Location: </p>
          <p className="ms-2">Hyderabad</p>
        </div>
        <div className="mt-2">
          <p className="fw-bold">Description: </p>
          <p className="">Exploring new opportunities and interests</p>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Experience: </p>
          <p className="ms-2">2 Years</p>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Salary: </p>
          <p className="ms-2">12 LPA</p>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Total Applicants: </p>
          <p className="ms-2">4</p>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Location: </p>
          <p className="ms-2">11-12-2024 </p>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;

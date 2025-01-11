import React from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../Utils/constant";
import { useDispatch } from "react-redux";
import { setJobApplications } from "../../Redux/applicationsSlice";
import { useState } from "react";

function JobApplicantsTable({ jobApplications }) {
  const dispatch = useDispatch();

  const applyApplicationStatus = async (status, applicationId) => {
    try {
      // Update Redux immediately
      dispatch(
        setJobApplications(
          jobApplications.map((application) =>
            application._id === applicationId
              ? { ...application, status }
              : application
          )
        )
      );

      // Update backend
      const response = await axios.put(
        `${APPLICATION_API_END_POINT}/status/update/${applicationId}`,
        { status }, // Correctly send status as object
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log("Application Status Updated Successfully");
      } else {
        console.log("Failed to update Application Status");
      }
    } catch (error) {
      console.log("Failed to update Application Status", error);
    }
  };

  return (
    <div className="container ">
      <table className="table mt-4">
        <thead className="text-center">
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Resume</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications && jobApplications.length > 0 ? (
            jobApplications.map((application, index) => (
              <tr key={index}>
                <td className="text-center">
                  {application?.applicant?.fullName.charAt(0).toUpperCase()}
                  {application?.applicant?.fullName.slice(1)}
                </td>
                <td className="text-center">{application?.applicant?.email}</td>
                <td className="text-center">
                  {application?.applicant?.phoneNumber}
                </td>
                <td className="text-center">
                  {application?.applicant?.profile?.resume ? (
                    <a
                      href={application?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {application?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    "NA"
                  )}
                </td>
                <td className="text-center ">
                  {application?.createdAt.split("T")[0]}
                </td>
                <td className="text-center d-flex justify-content-around">
                  <div className="dropdown">
                    <button
                      className={`btn dropdown-toggle w-100 ${
                        application?.status === "accepted"
                          ? "btn-success"
                          : application?.status === "rejected"
                          ? "btn-danger"
                          : "btn-dark"
                      }`}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {application?.status === "accepted" ||
                      application?.status === "rejected"
                        ? `${application?.status
                            .charAt(0)
                            .toUpperCase()}${application?.status.slice(1)}`
                        : "Pending"}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          type="button"
                          className="dropdown-item text-success fw-bold"
                          onClick={(e) => {
                            applyApplicationStatus("accepted", application._id);
                            // Close the dropdown after selecting an option
                            const dropdownMenu =
                              e.target.closest(".dropdown-menu");
                            if (dropdownMenu) {
                              dropdownMenu.previousElementSibling.click();
                            }
                          }}
                        >
                          Accept
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item text-danger fw-bold"
                          onClick={(e) => {
                            applyApplicationStatus("rejected", application._id);
                            // Close the dropdown after selecting an option
                            const dropdownMenu =
                              e.target.closest(".dropdown-menu");
                            if (dropdownMenu) {
                              dropdownMenu.previousElementSibling.click();
                            }
                          }}
                        >
                          Reject
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center  text-danger">
                No Jobs Added
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default JobApplicantsTable;

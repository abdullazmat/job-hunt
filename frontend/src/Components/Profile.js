import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import AppliedJobsTable from "./AppliedJobsTable";

const skills = ["Frontend", "Backend", "Fullstack", "React", "Nodejs"];

function Profile() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="container">
      <div className="border p-0 p-sm-5 py-4  rounded-start">
        <div className="d-flex justify-content-between ms-2">
          <div className="d-flex align-items-center">
            <div>
              <img
                src={
                  user?.user?.profile?.profilePhoto
                    ? user.user.profile.profilePhoto
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt={user.user.fullName}
                className="img-fluid rounded-circle"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <div>
              <h4 className="ms-3 p-0 m-0 fw-bold">
                {user?.user?.fullName.charAt(0).toUpperCase() +
                  user?.user?.fullName.slice(1)}
              </h4>
              <p className="ms-3 p-0 m-0" style={{ fontSize: "0.7rem" }}>
                Exploring new opportunities and interests
              </p>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faPen}
            className="p-3 edit-profile-icon"
            style={{ backgroundColor: "#F3F4F6" }}
          />
        </div>
        <div className="d-flex mt-4 align-items-center ms-2">
          <FontAwesomeIcon icon={faEnvelope} className="me-3" />
          <span className="p-0 m-0">{user?.user?.email}</span>
        </div>
        <div className="d-flex mt-4 align-items-center ms-2">
          <FontAwesomeIcon icon={faPhone} className="me-3" />
          <span className="p-0 m-0">{user?.user?.phoneNumber}</span>
        </div>
        <div className="mt-4">
          <h5 className="fw-bold ms-2">Skills</h5>
          <div className="d-flex mt-3 ms-2">
            {skills.map((skill, index) => (
              <span key={index} className="badge rounded-pill bg-primary me-2">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="resume ms-2">
          <h5 className="fw-bold mt-4 ">Resume</h5>
          <a target="_blank" href="https://google.com">
            {user?.user?.fullName.charAt(0).toUpperCase() +
              user?.user?.fullName.slice(1)}{" "}
            Resume PDF
          </a>
        </div>
      </div>
      <AppliedJobsTable />
    </div>
  );
}

export default Profile;

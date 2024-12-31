import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import AppliedJobsTable from "./AppliedJobsTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";

function Profile() {
  const [edit, setEdit] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const userData = user?.user;

  // console.log(user);
  return (
    <div className="container">
      <div className="border p-0 p-sm-5 py-4  rounded-start">
        <div className="d-flex justify-content-between ms-2">
          <div className="d-flex align-items-center">
            <div>
              <img
                src={
                  userData?.profile?.profilePhoto
                    ? userData?.profile.profilePhoto
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt={user?.user?.fullName}
                className="img-fluid rounded-circle"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <div>
              <h4 className="ms-3 p-0 m-0 fw-bold">
                {userData?.fullName
                  ? userData.fullName.charAt(0).toUpperCase() +
                    userData.fullName.slice(1)
                  : "Full Name"}
              </h4>
              <p className="ms-3 p-0 m-0" style={{ fontSize: "0.7rem" }}>
                {userData?.profile?.bio
                  ? userData.profile.bio
                  : "Exploring new opportunities and interests"}
              </p>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faPen}
            className="p-3 edit-profile-icon"
            onClick={() => setEdit(!edit)}
            style={{ backgroundColor: "#F3F4F6" }}
          />
        </div>
        <div className="d-flex mt-4 align-items-center ms-2">
          <FontAwesomeIcon icon={faEnvelope} className="me-3" />
          <span className="p-0 m-0">{userData?.email}</span>
        </div>
        <div className="d-flex mt-4 align-items-center ms-2">
          <FontAwesomeIcon icon={faPhone} className="me-3" />
          <span className="p-0 m-0">{userData?.phoneNumber}</span>
        </div>
        <div className="mt-4">
          <h5 className="fw-bold ms-2">Skills</h5>
          <div className="d-flex mt-3 ms-2">
            {userData?.profile?.skills?.map((skill, index) => (
              <span key={index} className="badge rounded-pill bg-primary me-2">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="resume ms-2">
          <h5 className="fw-bold mt-4 ">Resume</h5>
          <a target="_blank" href={userData?.profile?.resume}>
            {userData?.profile?.resumeOriginalName}
          </a>
        </div>
      </div>
      <AppliedJobsTable />
      <UpdateProfileDialog edit={edit} setEdit={setEdit} />
    </div>
  );
}

export default Profile;

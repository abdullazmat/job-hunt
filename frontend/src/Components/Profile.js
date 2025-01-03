import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant";
import { setUser } from "../Redux/authSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { user } = useSelector((state) => state.auth);
  console.log("Profile", user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // Re-fetch the updated user data
  //   axios
  //     .get(`${USER_API_END_POINT}/current-user`, { withCredentials: true })
  //     .then((res) => {
  //       dispatch(setUser(res.data.user));
  //     })
  //     .catch(console.error);
  // }, []);

  return (
    <div className="container">
      <div className="border p-0 p-sm-5 py-4  rounded-start">
        <div className="d-flex justify-content-between ms-2">
          <div className="d-flex align-items-center">
            <div>
              <img
                src={
                  user?.profile?.profilePhoto
                    ? user?.profile?.profilePhoto
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt={user?.fullName}
                className="img-fluid rounded-circle"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <div>
              <h4 className="ms-3 p-0 m-0 fw-bold">
                {user?.fullName
                  ? user?.fullName.charAt(0).toUpperCase() +
                    user?.fullName.slice(1)
                  : "Full Name"}
              </h4>
              <p className="ms-3 p-0 m-0" style={{ fontSize: "0.7rem" }}>
                {user?.profile?.bio
                  ? user?.profile?.bio
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
          <span className="p-0 m-0">{user?.email}</span>
        </div>
        <div className="d-flex mt-4 align-items-center ms-2">
          <FontAwesomeIcon icon={faPhone} className="me-3" />
          <span className="p-0 m-0">{user?.phoneNumber}</span>
        </div>
        <div className="mt-4">
          <h5 className="fw-bold ms-2">Skills</h5>
          <div className="d-flex mt-3 ms-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="badge rounded-pill bg-primary me-2"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="resume ms-2">
          <h5 className="fw-bold mt-4 ">Resume</h5>
          <a target="_blank" href={user?.profile?.resume}>
            {user?.profile?.resumeOriginalName
              ? user?.profile?.resumeOriginalName
              : "NA"}
          </a>
        </div>
      </div>
      <AppliedJobsTable />
      <UpdateProfileDialog edit={edit} setEdit={setEdit} />
    </div>
  );
};

export default Profile;

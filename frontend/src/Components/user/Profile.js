import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/authSlice";
import { USER_API_END_POINT } from "../../Utils/constant";
import NotFound from "../shared/notFound";

const Profile = () => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { appliedJobs } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  console.log("Profile", user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/user/${user?._id}`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          dispatch(setUser(res?.data?.user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      setImageLoading(true);
      const res = await axios.put(
        `${USER_API_END_POINT}/pfp/update`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(setUser(res?.data?.user));
    } catch (error) {
      console.log(error);
    } finally {
      setImageLoading(false);
    }
  };

  if (user?.role !== "student") {
    return <NotFound />;
  }

  return (
    <div className="container">
      <div className="border p-0 p-sm-5 py-4  rounded-start">
        <div className="d-flex justify-content-between ms-2">
          <div className="d-flex align-items-center">
            <div>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
              />
              <div
                className="position-relative"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              >
                {imageLoading ? (
                  <div
                    className="spinner-grow "
                    role="status"
                    style={{
                      width: "100px",
                      height: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <img
                    src={
                      user?.profile?.profilePhoto
                        ? user?.profile?.profilePhoto
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt={user?.fullName}
                    className="img-fluid rounded-circle"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => fileRef.current.click()}
                  />
                )}
              </div>
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
      <AppliedJobsTable appliedJobs={appliedJobs} />
      <UpdateProfileDialog edit={edit} setEdit={setEdit} />
    </div>
  );
};

export default Profile;

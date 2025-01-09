import React from "react";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../Utils/constant";
import { setUser } from "../../Redux/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

function UpdateProfileDialog({ edit, setEdit }) {
  const { user } = useSelector((state) => state.auth);
  // const user = user?.user;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || [],
    file: user?.profile?.resume || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObject = new FormData();
    formDataObject.append("fullName", formData.fullName);
    formDataObject.append("email", formData.email);
    formDataObject.append("phoneNumber", formData.phoneNumber);
    formDataObject.append("bio", formData.bio);
    formDataObject.append("skills", formData.skills);
    if (formData.file) {
      formDataObject.append("file", formData.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formDataObject,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        console.log("User Update Dispatch:", res.data.user);

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
    setEdit(false);
    console.log("formData", formData);
  };

  return (
    <div
      className={`modal fade ${edit ? "show" : ""}`}
      tabIndex="-1"
      style={{
        display: edit ? "block" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Profile</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setEdit(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="email-info-edit">
                <label htmlFor="email" className="form-label fw-medium">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control "
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="name-info-edit mt-2">
                <label htmlFor="fullName" className="form-label fw-medium">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="fullName"
                  name="fullName"
                  value={
                    formData.fullName.charAt(0).toUpperCase() +
                    formData.fullName.slice(1)
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="phoneNumber-info-edit mt-2">
                <label htmlFor="name" className="form-label fw-medium">
                  Phone Number
                </label>
                <input
                  className="form-control "
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="bio-info-edit mt-2">
                <label htmlFor="bio" className="form-label fw-medium">
                  Bio
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="skills-info-edit mt-2">
                <label htmlFor="skills" className="form-label fw-medium">
                  Skills
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
              <div className="resume-info-edit mt-2">
                <label htmlFor="file" className="form-label fw-medium">
                  Resume
                </label>
                <input
                  type="file"
                  className="form-control "
                  id="file"
                  name="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEdit(false)} // Close modal
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {loading ? "Loading..." : "Update"}
              </button>
            </div>
          </div>
        </div>
        {error && (
          <div
            className="toast-container position-fixed"
            style={{ bottom: "50px", right: "10px" }} // Adjust these values
          >
            <div
              id="liveToast"
              className="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-body text-danger">{error}</div>
            </div>
          </div>
        )}
        {success && user && (
          <div
            className="toast-container position-fixed bottom-0 end-0 p-3"
            style={{ bottom: "50px", right: "10px" }} // Adjust these values
          >
            <div
              id="liveToast"
              className="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-body text-success fw-bold">
                Successfully Updated
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default UpdateProfileDialog;

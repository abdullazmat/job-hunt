import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObject = new FormData(); //formdata object
    formDataObject.append("fullname", formData.fullName);
    formDataObject.append("email", formData.email);
    formDataObject.append("phoneNumber", formData.phoneNumber);
    formDataObject.append("password", formData.password);
    formDataObject.append("role", formData.role);
    if (formData.file) {
      formDataObject.append("file", formData.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (!res.data.success) {
        setLoading(false);
        setError(res.data.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      } else {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5 mt-2 mt-md-0">
      <form
        className="container p-3 d-flex flex-column justify-content-center border col-12 col-sm-9 col-md-6 col-lg-4"
        onSubmit={handleSubmit}
      >
        <h4 className="mb-4 fw-bold">Sign Up</h4>
        {/* Full Name Field */}
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label fw-medium">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            required
            placeholder="abdullah"
            onChange={handleChange}
          />
        </div>
        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-medium">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            placeholder="abc@gmail.com"
            onChange={handleChange}
          />
        </div>
        {/* Phone Number Field */}
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label fw-medium">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            placeholder="+923175183327"
            id="phoneNumber"
            name="phoneNumber"
            pattern="\+92[0-9]{10}"
            required
            onChange={handleChange}
          />
        </div>
        {/* Password Field */}
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label fw-medium"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        {/* Radio Buttons for Role Selection */}
        <div className="d-flex flex-column flex-sm-row mb-3">
          <div className="form-check mb-4 mt-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="student"
              value="student"
              required
              onChange={handleChange}
              checked={formData.role === "student"}
            />
            <label className="form-check-label fw-medium" htmlFor="student">
              Student
            </label>
          </div>
          <div className="form-check mb-4 mt-2 ms-sm-3">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value="recruiter"
              id="recruiter"
              onChange={handleChange}
              required
              checked={formData.role === "recruiter"}
            />
            <label className="form-check-label fw-medium" htmlFor="recruiter">
              Recruiter
            </label>
          </div>
        </div>
        {/* Profile Image Upload Section */}
        <div className="mb-3 mt-1 d-flex align-items-center justify-content-between">
          <label htmlFor="formFile" className="form-label fw-bold">
            Profile
          </label>
          <input
            className="form-control w-75 w-sm-100 ms-3"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-dark mt-2">
          {loading ? "Loading..." : "Sign Up"}
        </button>
        {/* Link for Existing Account */}
        <div className="mt-3 d-flex justify-content-center">
          <p>Already have an account?</p>
          <Link to="/login" className="ms-2">
            Log In
          </Link>
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
        )}{" "}
        {success && (
          <div
            className="toast-container position-fixed bottom-0 end-0 p-3"
            // style={{ bottom: "50px", right: "10px" }} // Adjust these values
          >
            <div
              id="liveToast"
              className="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-body text-success">
                Signed Up Successfully
              </div>
            </div>
          </div>
        )}{" "}
      </form>
    </div>
  );
}

export default SignUp;

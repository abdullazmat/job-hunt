import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="container p-5 mt-2 mt-md-0">
      <form className="container p-3 d-flex flex-column justify-content-center border col-12 col-sm-9 col-md-6 col-lg-4">
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
            required
            placeholder="abdullah"
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
            required
            placeholder="abc@gmail.com"
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
            pattern="\+92[0-9]{10}"
            required
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
              id="recruiter"
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
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-dark mt-2">
          Sign Up
        </button>

        {/* Link for Existing Account */}
        <div className="mt-3 d-flex justify-content-center">
          <p>Already have an account?</p>
          <Link to="/login" className="ms-2">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

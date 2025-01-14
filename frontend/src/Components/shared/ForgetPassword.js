import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { USER_API_END_POINT } from "../../Utils/constant";
import { useSelector } from "react-redux";
import NotFound from "./notFound";

function ForgetPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      setSuccess(false); // Clear success message when timer ends
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formObject = new FormData();
      formObject.append("email", formData.email);

      const res = await axios.post(
        `${USER_API_END_POINT}/forget-password`,
        formObject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setSuccess(true);
        setIsTimerActive(true);
        setTimer(60); // Start 60-second timer
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Try again!"
      );
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <NotFound />;
  }

  return (
    <div className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <div className="row gy-3 mb-5">
                <div className="col-12">
                  <div className="text-center">
                    <h2>Reset Password</h2>
                  </div>
                </div>
                <div className="col-12">
                  <h2 className="fs-6 fw-normal text-center text-secondary m-0 px-md-5">
                    Provide the email address associated with your account to
                    recover your password.
                  </h2>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    {success && (
                      <div
                        className="alert alert-success fw-bold mt-2"
                        role="alert"
                      >
                        Password reset link has been sent to your email.
                      </div>
                    )}
                    {success && timer > 0 && (
                      <div className=" fw-bold mt-2">
                        Resend Email Request After:{" "}
                        <span className="fw-bold text-danger">
                          {timer} seconds
                        </span>
                      </div>
                    )}
                    {error && (
                      <div
                        className="alert alert-danger fw-bold mt-2"
                        role="alert"
                      >
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        className="btn btn-dark btn-lg"
                        type="submit"
                        disabled={isTimerActive || loading}
                      >
                        {loading ? "Loading..." : "Reset Password"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-12">
                  <hr className="mt-5 mb-4 border-secondary-subtle" />
                  <div className="d-flex gap-4 justify-content-center">
                    <Link
                      to={"/login"}
                      className="link-secondary text-decoration-none"
                    >
                      Log In
                    </Link>
                    <Link
                      to={"/signup"}
                      className="link-secondary text-decoration-none"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;

import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../Utils/constant";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./notFound";

function UpdatePassword() {
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);

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
      formObject.append("password", formData.password);
      const res = await axios.put(
        `${USER_API_END_POINT}/reset-password/${params?.token}`,
        formObject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
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
                    <h2>Update Password</h2>
                  </div>
                </div>
                <div className="col-12">
                  <h2 className="fs-6 fw-normal text-center text-secondary m-0 px-md-5">
                    Update password associated with your email address.
                  </h2>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <div className="d-flex w-75">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control "
                          name="password"
                          id="password"
                          required
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button className="btn btn-dark btn-lg" type="submit">
                        {loading ? "Loading..." : "Update Password"}
                      </button>
                    </div>
                  </div>
                </div>
                {error && (
                  <div
                    className="toast-container position-fixed"
                    style={{ bottom: "50px", right: "10px" }}
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
                {success && (
                  <div
                    className="alert alert-success fw-bold mt-2"
                    role="alert"
                  >
                    Password Updated Successfully{" "}
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger fw-bold mt-2" role="alert">
                    {error}
                  </div>
                )}

                <div
                  className="toast-container position-fixed"
                  style={{ bottom: "50px", right: "10px" }}
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
              </form>
              <div className="row">
                <div className="col-12">
                  <hr className="mt-5 mb-4 border-secondary-subtle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;

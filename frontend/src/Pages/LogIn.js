import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/authSlice.js";

function LogIn() {
  // Use States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);

  // Redux States
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // Functions

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setUserData(data);
      if (data.success === false) {
        dispatch(setLoading(false));
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      } else {
        dispatch(setLoading(false));
        setSuccess(true);
        setError(null);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      dispatch(setLoading(false));
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="container p-5 mt-4 mt-md-0">
      <form
        className="container p-3 d-flex flex-column justify-content-center border col-12 col-sm-9 col-md-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <h4 className="mb-4 fw-bold">Log In</h4>
          <label htmlFor="exampleInputEmail1" className="form-label fw-medium">
            Email
          </label>
          <input
            type="email"
            className="form-control "
            id="email"
            name="email"
            aria-describedby="emailHelp"
            required
            placeholder="abc@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label fw-medium"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control "
            id="password"
            name="password"
            required
            placeholder="password"
            onChange={handleChange}
          />
        </div>

        <div className="d-flex ">
          <div className="form-check mb-4 mt-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="student"
              value="student"
              onChange={handleChange}
              checked={formData.role === "student"}
            />
            <label className="form-check-label fw-medium" htmlFor="student">
              Student
            </label>
          </div>
          <div className="form-check mb-4 mt-2 ms-4">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="recruiter"
              onChange={handleChange}
              value="recruiter"
              checked={formData.role === "recruiter"}
            />
            <label className="form-check-label fw-medium" htmlFor="recruiter">
              Recruiter
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-dark">
          {loading ? "Loading ..." : "Log In"}
        </button>
        <div className="mt-3 d-flex">
          <p>Dont have an account?</p>
          <Link to="/signup" className="ms-2">
            SignUp
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
        )}
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
              <div className="toast-body text-success fw-bold">
                {userData.message}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default LogIn;

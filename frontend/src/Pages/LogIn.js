import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/authSlice.js";
import NotFound from "../Components/shared/notFound.js";

function LogIn() {
  // Use States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  // Redux States
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, loading: userLoading } = useSelector((state) => state.auth);

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
      setLoading(true);
      const res = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      } else {
        setLoading(false);
        dispatch(setUser(data.user));
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    // Redirect logged-in users away from the login page
    if (user && !userLoading) {
      navigate("/");
    }
  }, [user, userLoading, navigate]);

  // Wait for the user state to initialize before showing the form or error
  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return null; // Avoid rendering if user is already logged in
  }

  // UI
  return (
    <div className="container p-5 mt-4 mt-md-0">
      <form
        className="container p-3 d-flex flex-column justify-content-center border col-12 col-sm-9 col-md-6"
        onSubmit={handleSubmit}
      >
        {/* Form Fields */}
        <div className="mb-3">
          <h4 className="mb-4 fw-bold">Log In</h4>
          <label htmlFor="email" className="form-label fw-medium">
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
          <label htmlFor="password" className="form-label fw-medium">
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

        {/* Role Selection */}
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
        <div className="mt-2 d-flex">
          <p className="text-danger">Forgot Password?</p>
          <Link to="/forget-password" className="ms-2">
            Click here
          </Link>
        </div>
        {/* Error and Success Messages */}
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
        {success && user && (
          <div
            className="toast-container position-fixed bottom-0 end-0 p-3"
            style={{ bottom: "50px", right: "10px" }}
          >
            <div
              id="liveToast"
              className="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-body text-success fw-bold">
                Logged In Successfully
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default LogIn;

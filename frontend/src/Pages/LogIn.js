import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);

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
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      } else {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
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
        {error && <p className="text-danger mt-2">{error}</p>}
        {success && <p className="text-success mt-2">Logged In Successfully</p>}
      </form>
    </div>
  );
}

export default LogIn;

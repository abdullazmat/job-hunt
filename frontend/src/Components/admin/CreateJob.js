import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "../../Utils/constant.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobDesc } from "../../Redux/jobSlice.js";
import useGetAdminCompanies from "../../Hooks/useGetComapniesByAdmin.js";
import { useEffect } from "react";

function JobCreate() {
  useGetAdminCompanies();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const { adminCompanies } = useSelector((state) => state.company);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyId: "",
    location: "",
    salary: "",
    experienceLevel: "",
    jobType: "",
    requirements: "",
    position: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      title: formData?.title,
      description: formData?.description,
      companyId: formData?.companyId,
      location: formData?.location,
      salary: Number(formData?.salary),
      experienceLevel: Number(formData?.experienceLevel),
      jobType: formData?.jobType,
      requirements: formData?.requirements,
      position: formData?.position,
    };

    console.log("Job Data:", jobData);

    try {
      setLoading(true);
      const response = await axios.post(`${JOB_API_END_POINT}/post`, jobData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response?.data?.success) {
        dispatch(setJobDesc(response?.data?.job));
        console.log("Job Data Create Response:", response?.data?.job);
        navigate("/admin/jobs");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {adminCompanies?.length === 0 && (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <h3 className="text-danger">
            You need to list a company to add a job
          </h3>
        </div>
      )}
      <div className="p-sm-0 p-md-5 mt-5 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="p-3"
            onClick={() => navigate("/admin/jobs")}
            style={{ backgroundColor: "#F3F4F6", cursor: "pointer" }}
          />
          <p className="ms-2 mt-3 fw-bold">Back</p>
        </div>

        <div className="text-center flex-grow-1">
          <h3 className="mb-0">Create Job</h3>
        </div>
      </div>

      {/* Form Section */}
      <form className="mt-4">
        <div className="row g-4">
          {/* Job Title */}
          <div className="col-md-6">
            <label htmlFor="title" className="fw-bold form-label">
              Job Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="col-md-6">
            <label htmlFor="description" className="fw-bold form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row g-4 mt-2">
          {/* Requirements */}
          <div className="col-md-6">
            <label htmlFor="requirements" className="fw-bold form-label">
              Requirements
            </label>
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              id="requirements"
              name="requirements"
              required
            />
          </div>

          {/* Location */}
          <div className="col-md-6">
            <label htmlFor="location" className="fw-bold form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row g-4 mt-2">
          {/* Salary */}
          <div className="col-md-6">
            <label htmlFor="salary" className="fw-bold form-label">
              Salary
            </label>
            <input
              type="number"
              onChange={handleChange}
              className="form-control"
              id="salary"
              name="salary"
              required
            />
          </div>

          {/* Experience Level */}
          <div className="col-md-6">
            <label htmlFor="experienceLevel" className="fw-bold form-label">
              Years Of Experience
            </label>
            <input
              type="number"
              className="form-control"
              id="experienceLevel"
              name="experienceLevel"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row g-4 mt-2">
          {/* Comapany */}
          <div className="col-md-6">
            <label htmlFor="companyId" className="fw-bold form-label">
              Choose Company
            </label>
            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle w-100"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {formData.companyId
                  ? adminCompanies?.find(
                      (company) => company?._id === formData?.companyId
                    )?.name || "Select Company"
                  : "Select Company"}
              </button>
              <ul className="dropdown-menu">
                {adminCompanies?.length > 0 ? (
                  adminCompanies?.map((company) => (
                    <li key={company._id}>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() =>
                          setFormData({ ...formData, companyId: company?._id })
                        }
                      >
                        {company?.name}
                      </button>
                    </li>
                  ))
                ) : (
                  <li>No Companies Listed</li>
                )}
              </ul>
            </div>
          </div>

          {/* Job Role */}
          <div className="col-md-6">
            <label htmlFor="jobType" className="fw-bold form-label">
              Job Role
            </label>
            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle w-100"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {formData.jobType === "On Site" || formData.jobType === "Remote"
                  ? formData.jobType
                  : "Select Job Role"}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() =>
                      setFormData({ ...formData, jobType: "On Site" })
                    }
                  >
                    On Site
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() =>
                      setFormData({ ...formData, jobType: "Remote" })
                    }
                  >
                    Remote
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-2">
          {/* Position */}
          <div className="col-md-6">
            <label htmlFor="position" className="fw-bold form-label">
              Position
            </label>
            <input
              type="number"
              className="form-control"
              id="position"
              name="position"
              onChange={handleChange}
              value={formData?.position || ""}
              required
            />
          </div>

          <div className="col-md-6 d-flex align-items-end  justify-content-center mt-5  mb-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn w-100"
              style={{ backgroundColor: "#6A38C2", color: "white" }}
            >
              {loading ? "Loading..." : "Create"}
            </button>
          </div>
        </div>
      </form>

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
            <div className="toast-body text-success fw-bold">Job Created</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobCreate;

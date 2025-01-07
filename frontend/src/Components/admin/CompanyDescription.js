import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../../Utils/constant";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyData } from "../../Redux/companySlice.js";
import useGetCompanyData from "../../Hooks/useGetCompanyData.js";

function CompanyDescription() {
  const { companyData } = useSelector((state) => state.company);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  useGetCompanyData(params.id);

  const [formData, setFormData] = useState({
    name: companyData?.name || "",
    description: companyData?.description || "",
    website: companyData?.website || "",
    location: companyData?.location || "",
    file: companyData?.logo || null,
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
    formDataObject.append("name", formData?.name);
    formDataObject.append("description", formData?.description);
    formDataObject.append("website", formData?.website);
    formDataObject.append("location", formData?.location);
    if (formData.file) {
      formDataObject.append("file", formData?.file);
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formDataObject,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setCompanyData(response.data.company));
        navigate("/admin/companies");
        setSuccess(true);
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
      <div className="p-sm-0 p-md-5 mt-5 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="p-3"
            onClick={() => navigate("/admin/companies")}
            style={{ backgroundColor: "#F3F4F6", cursor: "pointer" }}
          />
          <p className="ms-2 mt-3 fw-bold">Back</p>
        </div>

        <div className="text-center flex-grow-1">
          <h3 className="mb-0">Company Profile</h3>
        </div>
      </div>

      {/* Form Section */}
      <form className="mt-5">
        <div className="row g-4">
          {/* Company Name */}
          <div className="col-md-6">
            <label htmlFor="name" className="fw-bold form-label">
              Company Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleChange}
              required
              value={formData?.name || ""}
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
              value={formData?.description || ""}
              required
            />
          </div>
        </div>

        <div className="row g-4 mt-4">
          {/* Website */}
          <div className="col-md-6">
            <label htmlFor="website" className="fw-bold form-label">
              Website
            </label>
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              id="website"
              name="website"
              required
              value={formData?.website || ""}
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
              value={formData?.location || ""}
              required
            />
          </div>
        </div>

        <div className="row g-4 mt-4">
          {/* Logo Upload */}
          <div className="col-md-6">
            <label htmlFor="file" className="fw-bold form-label">
              Logo
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              className="form-control"
              id="file"
              name="file"
              required
            />
          </div>

          <div className="col-md-6 d-flex align-items-end justify-content-md-start justify-content-center mt-5  mb-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-dark w-100"
            >
              {loading ? "Loading..." : "Update"}
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
              Company Info Updated
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyDescription;

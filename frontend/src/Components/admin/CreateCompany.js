import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../../Utils/constant";
import { useNavigate } from "react-router-dom";
import { setCompanyData } from "../../Redux/companySlice.js";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerCompany = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        console.log("Company created successfully");
        dispatch(setCompanyData(response?.data?.company));
        console.log(response?.data);
        const companyId = response?.data?.company?._id;

        setSuccess("Company created successfully");
        setTimeout(() => {
          setSuccess(null);
          navigate(`/admin/companies/${companyId}`);
        }, 2000);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div>
        <h2 className="">Your Company Name</h2>
        <div className="mt-5">
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control outline-dark"
            id="companyName"
            value={companyName}
            name="companyName"
            placeholder="Enter Company Name"
            style={{ border: "1.5px solid black" }}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="container mt-5 d-flex">
          <button
            className="btn btn-outline-dark"
            onClick={() => navigate("/admin/companies")}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn-dark ms-5"
            onClick={registerCompany}
            disabled={!companyName?.trim() || loading}
          >
            {loading ? "Loading..." : "Continue"}
          </button>
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
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            id="liveToast"
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body text-success fw-bold">{success}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCompany;

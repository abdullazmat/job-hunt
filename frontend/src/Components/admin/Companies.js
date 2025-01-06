import React from "react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

function Companies() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="p-sm-2 p-md-5 d-flex align-items-center justify-content-between">
        <input
          className="form-control w-50"
          type="search"
          style={{ color: "#6b7280" }}
          placeholder="Filter Companies"
          aria-label="Search"
        />
        <button
          className="btn btn-dark"
          onClick={() => navigate("/admin/companies/create")}
        >
          Add Company
        </button>
      </div>
      <CompaniesTable />
    </div>
  );
}

export default Companies;

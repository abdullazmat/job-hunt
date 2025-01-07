import React, { useState } from "react";
import CompaniesRegisteredTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAdminCompanies from "../../Hooks/useGetComapniesByAdmin.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Companies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAdminCompanies();

  const { adminCompanies } = useSelector((state) => state.company);
  const [input, setInput] = useState("");
  console.log("Admin Companies UseState:", adminCompanies);

  useEffect(() => {}, [input]);

  return (
    <div className="container">
      <div className="p-sm-2 p-md-5 d-flex align-items-center justify-content-between">
        <input
          className="form-control w-50"
          type="search"
          style={{ color: "#6b7280" }}
          placeholder="Filter Companies"
          aria-label="Search"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn btn-dark"
          onClick={() => navigate("/admin/companies/create")}
        >
          Add Company
        </button>
      </div>
      <CompaniesRegisteredTable companies={adminCompanies} />
    </div>
  );
}

export default Companies;

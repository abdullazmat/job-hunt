import React, { useState } from "react";
import CompaniesRegisteredTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAdminCompanies from "../../Hooks/useGetComapniesByAdmin.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../Redux/companySlice.js";
import NotFound from "../shared/notFound";

function Companies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminCompanies } = useSelector((state) => state.company);
  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState("");
  console.log("Admin Companies UseState:", adminCompanies);

  useGetAdminCompanies([]);

  // Use Effect to filter companies by text
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  if (user?.role !== "recruiter") {
    return <NotFound />;
  }

  return (
    <div className="container-fluid container-md container-lg container-xl">
      <div className="p-sm-0 p-md-5 d-flex align-items-center justify-content-between">
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

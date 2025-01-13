import React, { useState } from "react";
import AdminJobsTable from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setJobByText } from "../../Redux/jobSlice";
import useGetAdminJobs from "../../Hooks/useGetAdminJobs";
import NotFound from "../shared/notFound";

function AdminJobs() {
  useGetAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminJobs } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  const [input, setInput] = useState("");
  console.log("Jobs Listed UseState:", adminJobs);

  // Use Effect to filter jobs by text
  useEffect(() => {
    dispatch(setJobByText(input));
  }, [input]);

  if (user?.role !== "recruiter") {
    return <NotFound />;
  }

  return (
    <div className="container">
      <div className="p-sm-2 p-md-5 d-flex align-items-center justify-content-between">
        <input
          className="form-control w-50"
          type="search"
          style={{ color: "#6b7280" }}
          placeholder="Filter Jobs"
          aria-label="Search"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn btn-dark"
          onClick={() => navigate("/admin/jobs/create")}
        >
          Add Job
        </button>
      </div>
      <AdminJobsTable jobs={adminJobs} />
    </div>
  );
}

export default AdminJobs;

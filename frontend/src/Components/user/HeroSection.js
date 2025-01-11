import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../Redux/jobSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="container">
      <div className="d-grid gap-2  mx-auto mt-5" style={{ width: "200px" }}>
        <button
          className="btn hero-btn rounded-pill fw-semibold"
          type="button"
          style={{ color: "#f83002", backgroundColor: "#F3F4F6" }}
        >
          No 1 Job Hunt Website
        </button>
      </div>

      <div className="mt-4 text-center">
        <h1 className="fw-bolder" style={{ color: "#020817" }}>
          Search, Apply &<br />
          Get Your <span style={{ color: "#6A38C2" }}>Dream Jobs</span>
        </h1>
      </div>

      <div className="mt-4 text-center">
        <p style={{ color: "#6b7280" }}>
          Find the best jobs and career opportunities with Job Hunt, a trusted
          platform for effortless job searches and applications.
        </p>
      </div>

      <div className="input-group w-75 w-md-50 w mx-auto mt-5">
        <input
          className="form-control"
          type="search"
          style={{ color: "#6b7280" }}
          placeholder="Find your dream jobs"
          aria-label="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="p-0 m-0 border-0 " onClick={searchJobHandler}>
          <span className="input-group-text search-btn-hero">
            <a className="searchicon">
              <i className="fas fa-search"></i>
            </a>
          </span>
        </button>
      </div>
    </div>
  );
}

export default HeroSection;

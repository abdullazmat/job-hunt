import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../Redux/jobSlice";
import { useNavigate } from "react-router-dom";

import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CategoryCarousel() {
  const { allJobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [];

  allJobs.map((job) => {
    const category = job.title;
    categories.push(category);
  });

  return (
    <div className="container p-2 p-sm-3 p-md-3 mt-2 mt-sm-3 mt-md-3 w-100 w-sm-100 w-md-75 w-lg-50 w-xl-25">
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="1500"
        data-bs-pause="false"
      >
        <div className="carousel-inner mt-5">
          {categories.map((category, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="btn rounded-pill fw-semibold"
                  type="button"
                  style={{ color: "#020817", backgroundColor: "#e1e3e8" }}
                  onClick={() => {
                    dispatch(setSearchQuery(category));
                    navigate("/browse");
                  }}
                >
                  {category}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel navigation controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: "black" }} />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="mb-0 ms-4"
            style={{ color: "black" }}
          />
        </button>
      </div>
    </div>
  );
}

export default CategoryCarousel;

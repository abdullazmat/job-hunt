import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft

} from "@fortawesome/free-solid-svg-icons";

function CategoryCarousel() {
  return (
<div className="container p-2 p-sm-3 p-md-3 mt-2 mt-sm-3 mt-md-3 w-100 w-sm-100 w-md-75 w-lg-50 w-xl-25">
<div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner mt-5 ">
          <div className="carousel-item active">
            <div className="d-flex justify-content-center align-items-center ">
            <button className="btn  rounded-pill fw-semibold" type="button" style={{color : "#020817", backgroundColor : "#e1e3e8",}}>Front End Developer</button>
            </div>
          </div>
          <div className="carousel-item  ">
            <div className="d-flex justify-content-center align-items-center">
            <button className="btn  rounded-pill fw-semibold" type="button" style={{color : "#020817", backgroundColor : "#e1e3e8"}}>BackEnd Developer</button>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex justify-content-center align-items-center">
            <button className="btn  rounded-pill fw-semibold" type="button" style={{color : "#020817", backgroundColor : "#e1e3e8"}}>Full Stack Developer</button>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex justify-content-center align-items-center">
            <button className="btn  rounded-pill fw-semibold" type="button" style={{color : "#020817", backgroundColor : "#e1e3e8"}}>SEO Expert</button>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex justify-content-center align-items-center">
            <button className="btn  rounded-pill fw-semibold" type="button" style={{color : "#020817", backgroundColor : "#e1e3e8"}}>Graphic Designer</button>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev "
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
         <FontAwesomeIcon icon={faArrowLeft}  style={{color: "black"}} />

        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
         <FontAwesomeIcon icon={faArrowRight} className="mb-0 ms-4" style={{color: "black"}} />
        </button>
      </div>
    </div>
  );
}

export default CategoryCarousel;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";

function Header() {
  const [user, setUser] = useState(false);

  return (
    <div>
      <header className="p-3 mb-3 ">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <h3 style={{ fontWeight: "bold" }}>
                Job{" "}
                <span style={{ color: "#f83002", fontWeight: "bold" }}>
                  Hunt
                </span>
              </h3>
            </Link>

            <ul className="nav col-12 col-lg-auto ms-lg-auto me-0 me-lg-5 mb-2 justify-content-center mb-md-0">
              <li>
                <Link
                  to="/"
                  className="nav-link px-2  text-black nav-links"
                  style={{ fontWeight: "bold" }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="nav-link px-2 text-black  nav-links"
                  style={{ fontWeight: "bold" }}
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="nav-link px-2 text-black nav-links"
                  style={{ fontWeight: "bold" }}
                >
                  Browse
                </Link>
              </li>
            </ul>

            <div className="dropdown text-end me-0 me-lg-3">
              {user ? (
                <Link
                  to="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle mt-3 mt-md-0"
                  />
                </Link>
              ) : (
                <div className="mt-3 mt-lg-0">
                  <Link to={"/login"}>
                    <button
                      className="btn me-3 nav-login-btn "
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid black",
                      }}
                    >
                      LogIn
                    </button>
                  </Link>
                  <Link to={"/signup"}>
                    <button
                      className="btn nav-signup-btn "
                      style={{ backgroundColor: "#5F32AD", color: "white" }}
                    >
                      Signup
                    </button>
                  </Link>
                </div>
              )}
              <ul className="dropdown-menu text-small">
                <li>
                  <div className="d-flex ">
                    <img
                      src="https://github.com/mdo.png"
                      alt="mdo"
                      width="32"
                      height="32"
                      className="rounded-circle  "
                    />
                    <p
                      className="dropdown-item  "
                      style={{ fontWeight: "bold" }}
                    >
                      Abdullah
                    </p>
                  </div>
                </li>

                <li>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUser} className="ms-2" />
                    <Link
                      className="dropdown-item text-black view-profile-nav"
                      to="#"
                    >
                      View Profile
                    </Link>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="ms-2"
                    />
                    <Link
                      className="dropdown-item text-black view-profile-nav"
                      to="#"
                    >
                      Log out
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;

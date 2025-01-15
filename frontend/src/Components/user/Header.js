import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../Utils/constant";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../Redux/authSlice";
import { useState } from "react";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

            {user && user.role === "recruiter" ? (
              <ul className="nav col-12 col-lg-auto ms-lg-auto me-0 me-lg-5 mb-2 justify-content-center mb-md-0">
                <li>
                  <Link
                    to="/admin/companies"
                    className="nav-link px-2  text-black nav-links"
                    style={{ fontWeight: "bold" }}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="nav-link px-2 text-black  nav-links"
                    style={{ fontWeight: "bold" }}
                  >
                    Jobs
                  </Link>
                </li>
              </ul>
            ) : (
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
            )}

            <div className="dropdown text-end me-0 me-lg-3">
              {user ? (
                <Link
                  to="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={
                      user?.profile?.profilePhoto
                        ? user?.profile.profilePhoto
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
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
                      src={
                        user?.profile?.profilePhoto
                          ? user?.profile.profilePhoto
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      alt="mdo"
                      width="32"
                      height="32"
                      className="rounded-circle  "
                    />
                    <p
                      className="dropdown-item  "
                      style={{ fontWeight: "bold" }}
                    >
                      {user?.fullName
                        ? user?.fullName.charAt(0).toUpperCase() +
                          user?.fullName.slice(1)
                        : "Guest"}
                    </p>
                  </div>
                </li>

                {user && user.role === "student" && (
                  <li>
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faUser} className="ms-2" />

                      <Link
                        className="dropdown-item text-black view-profile-nav"
                        to="/profile"
                      >
                        View Profile
                      </Link>
                    </div>
                  </li>
                )}
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
                      onClick={logoutHandler}
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
      {success && (
        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ bottom: "50px", right: "10px" }} // Adjust these values
        >
          <div
            id="liveToast"
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body text-success fw-bold">
              Logged Out Successfully
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

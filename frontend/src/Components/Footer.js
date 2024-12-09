import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <div className="border-top w-100"></div>
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 ">
          <div className="col-md-4 d-flex align-items- flex-column">
            <h4 className="fw-bold">Job Hunt</h4>
            <p className="mb-3 mb-md-0 text-body-secondary">
              © 2024 Company, Inc
            </p>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-body-secondary" href="https://www.x.com/">
                <FontAwesomeIcon icon={faTwitter} style={{ color: "black" }} />
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-body-secondary"
                href="https://www.facebook.com/"
              >
                <FontAwesomeIcon icon={faFacebook} style={{ color: "black" }} />
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-body-secondary"
                href="https://www.instagram.com/"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ color: "black" }}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;

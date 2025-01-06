import React from "react";
import { faPen, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function AppliedJobsTable() {
  const [edit, setEdit] = useState(false);

  return (
    <div className="container ">
      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">Logo</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src="https://download.logo.wine/logo/Google/Google-Logo.wine.png"
                  width={50}
                ></img>
              </td>
              <td>Google</td>
              <td>01-06-2025</td>
              <td className=" mt-1 ">
                <FontAwesomeIcon
                  icon={faPen}
                  className="p-3 edit-profile-icon"
                  onClick={() => setEdit(!edit)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppliedJobsTable;

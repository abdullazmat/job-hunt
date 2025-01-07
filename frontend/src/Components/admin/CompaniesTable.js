import React from "react";
import { faPen, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function CompaniesRegisteredTable({ companies }) {
  const navigate = useNavigate();

  const [filterCompanies, setFilterCompanies] = useState(companies);
  const { searchCompanyText } = useSelector((state) => state.company);

  useEffect(() => {
    const filteredCompanies =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyText.toLowerCase());
      });
    setFilterCompanies(filteredCompanies);
  }, [companies, searchCompanyText]);

  console.log("Companies Array Rendered on Table:", filterCompanies);

  return (
    <div className="container ">
      <table className="table mt-4">
        <thead className="text-center">
          <tr>
            <th scope="col">Logo</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterCompanies.map((company, index) => (
            <tr key={index}>
              <td className="text-center">
                <img
                  src={
                    company?.logo ? company?.logo : "/DefaultCompanyLogo.png"
                  }
                  width={50}
                ></img>
              </td>
              <td className="text-center">{company?.name}</td>
              <td className="text-center">
                {company?.createdAt.split("T")[0]}
              </td>
              <td className=" mt-1  text-center">
                <FontAwesomeIcon
                  icon={faPen}
                  className=" edit-company-icon"
                  onClick={() => navigate(`/admin/companies/${company._id}`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompaniesRegisteredTable;

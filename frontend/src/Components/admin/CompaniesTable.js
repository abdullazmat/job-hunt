import React from "react";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  COMPANY_API_END_POINT,
  JOB_API_END_POINT,
  APPLICATION_API_END_POINT,
} from "../../Utils/constant";
import { useDispatch } from "react-redux";
import { setAdminCompanies } from "../../Redux/companySlice";
import { setAdminJobs } from "../../Redux/jobSlice";

function CompaniesRegisteredTable({ companies }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filterCompanies, setFilterCompanies] = useState([]);
  const { searchCompanyText } = useSelector((state) => state.company);
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const filteredCompanies =
      Array.isArray(companies) && companies.length > 0
        ? companies.filter((company) => {
            if (!searchCompanyText) {
              return true;
            }
            return company?.name
              ?.toLowerCase()
              .includes(searchCompanyText.toLowerCase());
          })
        : [];
    setFilterCompanies(filteredCompanies);
  }, [companies, searchCompanyText]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `${APPLICATION_API_END_POINT}/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        setSucess(true);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setAdminJobs(res?.data?.jobs));
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const deleteCompany = async (id) => {
    try {
      // Delete the company
      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        // Update the Redux store with the new company list
        dispatch(setAdminCompanies(res?.data?.companies));

        // Re-fetch the updated list of companies
        const fetchRes = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (fetchRes?.data?.success) {
          setFilterCompanies(fetchRes?.data?.companies);
        }

        // Get jobs related to the company
        const jobsRes = await axios.get(
          `${JOB_API_END_POINT}/get/jobs/company/${id}`,
          {
            withCredentials: true,
          }
        );

        if (jobsRes?.data?.success) {
          const jobs = jobsRes?.data?.jobs;
          const allApplications = [];

          jobs.forEach((job) => {
            deleteJob(job?._id); // Delete each job
            allApplications.push(...job?.applications); // Collect applications
          });

          allApplications.forEach((app) => deleteApplication(app));
          console.log("Applications to delete:", allApplications);
        }
      } else {
        console.error("Error while deleting company:", res?.data?.message);
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

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
          {filterCompanies && filterCompanies.length > 0 ? (
            filterCompanies?.map((company, index) => (
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
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="  ms-3"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteCompany(company._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-danger">
                No Companies Listed
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CompaniesRegisteredTable;

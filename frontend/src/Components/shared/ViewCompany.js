import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import useGetCompanyData from "../../Hooks/useGetCompanyData";
import { JOB_API_END_POINT } from "../../Utils/constant.js";
import { useDispatch } from "react-redux";
import { setCompanyJobs } from "../../Redux/jobSlice.js";
import { useEffect } from "react";
import NotFound from "../shared/notFound";

function ViewCompany() {
  const dispatch = useDispatch();
  const params = useParams();
  const companyId = params?.id;

  useGetCompanyData(companyId, [companyId]);

  const { companyData } = useSelector((state) => state.company);
  const { companyJobs } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getJobsByCompany = async (companyId) => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/jobs/company/${companyId}`,
          {
            withCredentials: true,
          }
        );
        if (res?.data?.success) {
          dispatch(setCompanyJobs(res?.data?.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getJobsByCompany(companyId);
  }, [companyId]);

  return (
    <div className="container border p-3 p-md-5">
      <div className="d-flex justify-content-between">
        <h4 className="fw-bold p-0 m-0">Company Details</h4>
      </div>

      <div>
        <div className="d-flex mt-4">
          <p className="fw-bold"> Name: </p>
          <p className="ms-2">{companyData?.name}</p>
        </div>
        <div className="mt-2">
          <p className="fw-bold">Description: </p>
          <p className="">{companyData?.description}</p>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Location: </p>
          <p className="ms-2">{companyData?.location}</p>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Website </p>
          {companyData?.website ? (
            <a
              className="ms-2"
              href={companyData.website}
              style={{ cursor: "pointer" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {new URL(companyData.website).origin}
            </a>
          ) : (
            <span className="ms-2">NA</span>
          )}
        </div>

        <div className="d-flex mt-2">
          <p className="fw-bold">Jobs Listed: </p>
          <p className="ms-2">{companyJobs?.length}</p>
        </div>
        <div className="d-flex mt-2">
          <p className="fw-bold">Listed: </p>
          <p className="ms-2">{companyData?.updatedAt.split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewCompany;

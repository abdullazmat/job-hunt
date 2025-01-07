import React, { useEffect } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../Utils/constant";
import { useDispatch } from "react-redux";
import { setCompanyData } from "../Redux/companySlice";

const useGetCompanyData = (CompanyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCompanyData = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${CompanyId}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          console.log("Company API Response:", res.data.company);
          dispatch(setCompanyData(res.data.company));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCompanyData();
  }, []);
};

export default useGetCompanyData;

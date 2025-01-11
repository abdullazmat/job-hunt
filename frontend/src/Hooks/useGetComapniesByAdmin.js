import React, { useEffect } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../Utils/constant";
import { useDispatch } from "react-redux";
import { setAdminCompanies } from "../Redux/companySlice";

const useGetAdminCompanies = (dependencies = []) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllComapnies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log("Admin Company API Response:", res.data.companies);
          dispatch(setAdminCompanies(res.data.companies));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllComapnies();
  }, dependencies);
};

export default useGetAdminCompanies;

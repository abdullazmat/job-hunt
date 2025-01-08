import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../Utils/constant";
import { useDispatch } from "react-redux";
import { setAdminJobs } from "../Redux/jobSlice";

const useGetAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminJobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log("Admin jOBS API Response:", res.data.companies);
          dispatch(setAdminJobs(res.data.jobs));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllAdminJobs();
  }, []);
};

export default useGetAdminJobs;

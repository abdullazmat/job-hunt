import React, { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../Utils/constant";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../Redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log("API Response:", res.data.jobs);
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllJobs();
  }, []);
};

export default useGetAllJobs;

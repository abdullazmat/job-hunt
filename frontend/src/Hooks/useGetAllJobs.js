import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../Utils/constant";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../Redux/jobSlice";

const useGetAllJobs = (dependencies = []) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllJobs();
  }, dependencies);
};

export default useGetAllJobs;

import React, { useEffect } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../Utils/constant";
import { useDispatch } from "react-redux";
import { setAppliedJobs } from "../Redux/authSlice";

const useGetAppliedJobs = (dependencies = []) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log("User Applied jOBS API Response:", res.data.applications);
          dispatch(setAppliedJobs(res.data.applications));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAppliedJobs();
  }, dependencies);
};

export default useGetAppliedJobs;

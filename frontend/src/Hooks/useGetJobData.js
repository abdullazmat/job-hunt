import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../Utils/constant";
import { useDispatch } from "react-redux";
import { setJobDesc } from "../Redux/jobSlice";

const useGetJobData = (JobId) => {
  console.log("Use EffectJob Id:", JobId);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getjob = async () => {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${JobId}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setJobDesc(response?.data?.job));
          console.log("Job Data UseEffect:", response?.data?.job);
        }
      };
      getjob();
    } catch (error) {
      console.log(error);
    }
  }, [JobId, dispatch]);
};

export default useGetJobData;

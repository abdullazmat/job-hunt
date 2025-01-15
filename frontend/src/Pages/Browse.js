import React from "react";
import FilterJobCards from "../Components/user/FilterJobCards";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../Redux/jobSlice";
import axios from "axios";
import { JOB_API_END_POINT } from "../Utils/constant";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../Redux/jobSlice";
import NotFound from "../Components/shared/notFound";
import { Navigate } from "react-router-dom";

function Browse() {
  const { allJobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchQuery } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchQuery}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllJobs();
  }, [searchQuery, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "student") {
    return <NotFound />;
  }

  return (
    <div className="container">
      <div className="col-12 col-md-12 py-4">
        <h2 className="ms-3" style={{ color: "#020817" }}>
          Search Results ({allJobs.length}):
        </h2>
        <div>
          {allJobs && (
            <div className="row g-3">
              {allJobs.map((job, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12 ">
                  <FilterJobCards id={job._id} job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Browse;

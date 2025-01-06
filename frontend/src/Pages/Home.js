import React, { useEffect } from "react";
import HeroSection from "../Components/user/HeroSection";
import CategoryCarousel from "../Components/user/CategoryCarousel";
import LatestJobs from "../Components/user/LatestJobs";
import useGetAllJobs from "../Hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  useGetAllJobs();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
}

export default Home;

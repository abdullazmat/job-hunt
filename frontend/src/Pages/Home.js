import React from "react";
import HeroSection from "../Components/HeroSection";
import CategoryCarousel from "../Components/CategoryCarousel";
import LatestJobs from "../Components/LatestJobs";
import useGetAllJobs from "../Hooks/useGetAllJobs";

function Home() {
  useGetAllJobs();

  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
}

export default Home;

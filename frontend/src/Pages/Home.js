import React from "react";
import HeroSection from "../Components/HeroSection";
import CategoryCarousel from "../Components/CategoryCarousel";
import LatestJobs from "../Components/LatestJobs";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
}

export default Home;

import React from "react";

// components
import Hero from "../../components/HomeComponents/Hero";
import Featured from "../../components/HomeComponents/Featured";
import FeaturesSection from "../../components/HomeComponents/FeaturesSection";
import Gallery from "../../components/HomeComponents/Gallery";
const home = () => {
  return (
    <div>
      <Hero />
      <Featured />
      <Gallery />
      
      <section
        className="py-5 animate-fade-in"
        style={{ backgroundColor: "var(--d-main-bg-color)" }}
      >
        <div className="container-fluid">
          <FeaturesSection />
        </div>
      </section>
    </div>
  );
};

export default home;

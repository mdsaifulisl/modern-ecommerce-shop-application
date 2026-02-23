import React from 'react';

// components
import Hero from "../../components/HomeComponents/Hero";
import Featured from "../../components/HomeComponents/Featured";
import FeaturesSection from "../../components/HomeComponents/FeaturesSection";
import Gallery from '../../components/HomeComponents/Gallery';
const home = () => {
    return (
        <div>
            <Hero />
            <Featured />
            <Gallery />
            <FeaturesSection />
        </div>
    );
};

export default home;
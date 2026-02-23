import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../../assets/style/home.css";

const Hero = () => {
  const sliderData = [
    { id: 1, image: "/slider1.png" },
    { id: 2, image: "/slider2.png" },
    { id: 3, image: "/slider1.png" },
  ];

  const [current, setCurrent] = useState(0);
  const length = sliderData.length;

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(sliderData) || sliderData.length <= 0) return null;

  return (
    <section className="hero-slider">
      <FaArrowLeft className="arrow left" onClick={prevSlide} />
      <FaArrowRight className="arrow right" onClick={nextSlide} />

      {sliderData.map((slide, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={slide.id}
        >
          <img src={slide.image} alt={`Slide ${index}`} className="image" />
        </div>
      ))}

      {/* Dots */}
      <div className="dots">
        {sliderData.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
      
    </section>
  );
};
export default Hero;

import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../../assets/style/home.css";

// context
import { useMedia } from "../../context/MediaContext";

const Hero = () => {
  const { media } = useMedia();

  const sliderData = Array.isArray(media)
    ? media
        .filter((item) => item.type === "slider")
        .map((item) => ({
          id: item._id,
          image: item.imageUrl || "/slider1.png",
        }))
    : [];

  const [current, setCurrent] = useState(0);
  const length = sliderData.length;


  useEffect(() => {
    if (length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [length]);

  const nextSlide = () => {
    if (length === 0) return;
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    if (length === 0) return;
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <h2>No media found</h2>
      </div>
    );
  }

  return (
    <section className="hero-slider">
      <FaArrowLeft className="arrow left" onClick={prevSlide} />
      <FaArrowRight className="arrow right" onClick={nextSlide} />

      {sliderData.map((slide, index) => (
        <div
          key={slide.id}
          className={index === current ? "slide active" : "slide"}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="image"
          />
        </div>
      ))}

      {/* Dots */}
      <div className="dots">
        {sliderData.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

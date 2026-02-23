import React from "react";
import {
  FaHeadset,
  FaShieldAlt,
  FaShippingFast,
  FaThumbsUp,
} from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaShippingFast />,
      title: "Fast Delivery",
      text: "Reliable shipping across the country right to your doorstep.",
      color: "var(--d-link-color)",
      bgColor: "rgba(167, 183, 221, 0.15)", // Based on --d-link-color
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      text: "Your transactions are safe and encrypted with our SSL protocols.",
      color: "var(--green-color)",
      bgColor: "rgba(25, 195, 50, 0.1)",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      text: "Our dedicated team is always ready to assist you anytime.",
      color: "var(--yellow-color)",
      bgColor: "rgba(254, 196, 0, 0.1)",
    },
    {
      icon: <FaThumbsUp />,
      title: "High Quality",
      text: "We ensure every product undergoes a strict quality check.",
      color: "var(--red-color)",
      bgColor: "rgba(255, 69, 136, 0.1)",
    },
  ];

  return (
    <>
      <div className="text-center mb-5">
        <h3 className="fw-bold" style={{ color: "var(--text-color)" }}>
          Why Shop With Us?
        </h3>
        <div
          className="mx-auto mt-2"
          style={{
            width: "60px",
            height: "4px",
            backgroundColor: "var(--green-color)",
            borderRadius: "2px",
          }}
        ></div>
      </div>
      <div className="row g-3 g-lg-4 text-center">
        {features.map((feature, idx) => (
          <div className="col-6 col-lg-3" key={idx}>
            <div
              className="dashboard-content bg-white h-100 p-4 shadow-sm border-0 transition-all"
              style={{ transition: "transform 0.3s ease" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-10px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: feature.bgColor,
                  color: feature.color,
                  fontSize: "1.8rem",
                }}
              >
                {feature.icon}
              </div>
              <h6
                className="fw-bold mb-2"
                style={{ color: "var(--text-color)" }}
              >
                {feature.title}
              </h6>
              <p
                className="small mb-0 opacity-75"
                style={{ color: "var(--text-color)", lineHeight: "1.5" }}
              >
                {feature.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturesSection;

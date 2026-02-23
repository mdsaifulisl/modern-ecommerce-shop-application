import React from "react";
import "../../assets/style/home.css";
import { FaShippingFast, FaHeadset, FaShieldAlt, FaThumbsUp } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-page pb-5">
      {/* --- HERO SECTION --- */}
      <div 
        className="about-hero bg-dark text-white text-center d-flex align-items-center justify-content-center"
        style={{ height: "350px", background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center/cover" }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">About Our Brand</h1>
          <p className="lead text-white">Redefining quality and style in every product.</p>
        </div>
      </div>

      <div className="container mt-5 pt-lg-4">
        <div className="row align-items-center g-5">
          {/* --- TEXT CONTENT --- */}
          <div className="col-lg-6">
            <h6 className="text-primary text-uppercase fw-bold">Our Story</h6>
            <h2 className="fw-bold mb-4">Crafting Excellence Since 2024</h2>
            <p className="text-muted">
              Welcome to our store! We started with a simple idea: to provide high-quality, 
              stylish, and durable products that enhance your daily life. Our team is dedicated 
              to sourcing the finest materials and ensuring every item meets our strict standards.
            </p>
            <p className="text-muted">
              Whether you're looking for the latest gadgets or timeless fashion, we strive to 
              create a shopping experience that is seamless, trustworthy, and inspiring. 
              Your satisfaction is our primary motivation.
            </p>
            <div className="row mt-4 g-3">
                <div className="col-6">
                    <h3 className="fw-bold text-primary mb-0">10k+</h3>
                    <small className="text-muted">Happy Customers</small>
                </div>
                <div className="col-6">
                    <h3 className="fw-bold text-primary mb-0">24/7</h3>
                    <small className="text-muted">Support Available</small>
                </div>
            </div>
          </div>

          {/* --- IMAGE SECTION --- */}
          <div className="col-lg-6">
            <div className="position-relative">
              <img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Our Workspace" 
                className="img-fluid rounded shadow-lg"
              />
              <div className="bg-primary p-3 rounded shadow text-white position-absolute bottom-0 start-0 m-3 d-none d-md-block">
                 <p className="mb-0 small fw-bold text-white">Quality Guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- FEATURES SECTION --- */}
        <div className="row mt-5 pt-5 text-center g-4">
          <h2 className="fw-bold mb-5">Why Shop With Us?</h2>
          
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4 hover-up">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 mx-auto">
                <FaShippingFast className="text-white fs-3" />
              </div>
              <h5 className="fw-bold">Fast Delivery</h5>
              <p className="small text-muted mb-0">Reliable shipping across the country right to your doorstep.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4 hover-up">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 mx-auto">
                <FaShieldAlt className="text-success fs-3" />
              </div>
              <h5 className="fw-bold">Secure Payments</h5>
              <p className="small text-muted mb-0">Your transactions are safe and encrypted with our SSL protocols.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4 hover-up">
              <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 mx-auto">
                <FaHeadset className="text-warning fs-3" />
              </div>
              <h5 className="fw-bold">24/7 Support</h5>
              <p className="small text-muted mb-0">Our dedicated team is always ready to assist you anytime.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4 hover-up">
              <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 mx-auto">
                <FaThumbsUp className="text-danger fs-3" />
              </div>
              <h5 className="fw-bold">High Quality</h5>
              <p className="small text-muted mb-0">We ensure every product undergoes a strict quality check.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
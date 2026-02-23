import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../assets/style/header.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED", email);
    alert("Login submitted!", email);
    setEmail("");
  };

  return (
    <footer className="footer-section">
      {/* Newsletter Section */}
      <div className="newsletter-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h4 className="mb-1 text-white">Join Our Newsletter</h4>
              <p className="text-white-50 mb-0">
                Get updates on new products and special offers.
              </p>
            </div>
            <div className="col-lg-6">
              <form className="newsletter-form">
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="off"
                  required
                />

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn btn-primary"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container footer-main py-5">
        <div className="row g-4">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-widget">
              <h5 className="footer-logo mb-4">Your Logo</h5>
              <p className="mb-4 text-light">
                We provide high-quality products to enhance your lifestyle.
                Experience premium shopping with our dedicated support.
              </p>
              <div className="social-links">
                <a href="#">
                  <FaFacebookF />
                </a>
                <a href="#">
                  <FaTwitter />
                </a>
                <a href="#"> 
                  <FaInstagram />
                </a>
                <a href="#">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <div className="footer-widget">
              <h6 className="mb-4">Quick Links</h6>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Customer Support */}
          <div className="col-lg-2 col-md-6 col-6">
            <div className="footer-widget">
              <h6 className="mb-4">Customer Care</h6>
              <ul>
                <li>
                  <Link to="/">My Account</Link>
                </li>
                <li>
                  <Link to="/">Track Order</Link>
                </li>
                <li>
                  <Link to="/">Wishlist</Link>
                </li>
                <li>
                  <Link to="/">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-widget">
              <h6 className="mb-4">Contact Info</h6>
              <div className="contact-item mb-3">
                <FaMapMarkerAlt className="me-3" />
                <span>1219 South Banasree, Dhaka, Bangladesh</span>
              </div>
              <div className="contact-item mb-3">
                <FaPhoneAlt className="me-3" />
                <span>+880 1741899095</span>
              </div>
              <div className="contact-item mb-3">
                <FaEnvelope className="me-3" />
                <span>saiful01741899@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom py-3">
        <div className="container border-top pt-3">
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="small mb-0 text-light">
                © {new Date().getFullYear()} Your Logo. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
              <img
                src="https://i.ibb.co/Qfvn4z6/payment.png"
                alt="Payment Methods"
                style={{ height: "25px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

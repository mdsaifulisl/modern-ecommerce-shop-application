
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
  return (
    <footer className="footer-section">
      
      {/* ================= Main Footer ================= */}
      <div className="container footer-main py-5">

        <div className="row g-4">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-widget">

              <h5 className="footer-logo mb-3">
                Your Logo
              </h5>

              <p className="mb-4 text-light">
                We provide premium quality products with
                trusted service and fast delivery.
              </p>

              <div className="social-links">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaLinkedinIn /></a>
              </div>

            </div>
          </div>


          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <div className="footer-widget">

              <h6 className="mb-3">Quick Links</h6>

              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>

            </div>
          </div>


          {/* Customer Care */}
          <div className="col-lg-2 col-md-6 col-6">
            <div className="footer-widget">

              <h6 className="mb-3">Customer Care</h6>

              <ul>
                <li><Link to="/">My Account</Link></li>
                <li><Link to="/">Track Order</Link></li>
                <li><Link to="/">Wishlist</Link></li>
                <li><Link to="/">Privacy Policy</Link></li>
              </ul>

            </div>
          </div>


          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-widget">

              <h6 className="mb-3">Contact Info</h6>

              <div className="contact-item mb-2">
                <FaMapMarkerAlt />
                <span>
                  1219 South Banasree, Dhaka
                </span>
              </div>

              <div className="contact-item mb-2">
                <FaPhoneAlt />
                <span>
                  +880 1741899095
                </span>
              </div>

              <div className="contact-item">
                <FaEnvelope />
                <span>
                  saiful01741899@gmail.com
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>


      {/* ================= Bottom ================= */}
      <div className="footer-bottom py-3">

        <div className="container border-top pt-3">

          <div className="row align-items-center">

            <div className="col-md-6 text-center text-md-start">
              <p className="small mb-0 text-light">
                © {new Date().getFullYear()} Your Logo.
                All rights reserved.
              </p>
            </div>

            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
              <img
                src="https://i.ibb.co/Qfvn4z6/payment.png"
                alt="Payment"
                height="25"
              />
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

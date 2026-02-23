import React, { useState } from "react";
import "../../assets/style/home.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", formData);
    alert("Thank you! Your message has been sent successfully.");
  };

  return (
    <div className="contact-page bg-light">
      {/* --- HEADER SECTION --- */}
      <div
        className="container-fluid d-flex align-items-center justify-content-center flex-column text-white text-center"
        style={{
          minHeight: "35vh",
          background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="fw-bold display-4">Contact Us</h1>
        <p className="lead">We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* --- LEFT SIDE: Contact Info --- */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm p-4 h-100">
              <h3 className="fw-bold mb-4">Get In Touch</h3>
              <p className="text-black mb-5">
                Have a question about a product or an order? Our team is here to help. 
                Expect a response within 24 hours.
              </p>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                  <FaPhoneAlt className="text-white" />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Phone</h6>
                  <p className="mb-0 text-muted">+880 17XX XXXXXX</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                  <FaEnvelope className="text-success" />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Email</h6>
                  <p className="mb-0 text-muted">support@yourbrand.com</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-5">
                <div className="bg-danger bg-opacity-10 p-3 rounded-circle me-3">
                  <FaMapMarkerAlt className="text-danger" />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Office</h6>
                  <p className="mb-0 text-muted"> Dhaka, Bangladesh</p>
                </div>
              </div>

              <h6 className="fw-bold mb-3">Follow Us</h6>
              <div className="d-flex gap-3">
                <a href="#" className="btn btn-outline-primary rounded-circle p-2"><FaFacebook /></a>
                <a href="#" className="btn btn-outline-danger rounded-circle p-2"><FaInstagram /></a>
                <a href="#" className="btn btn-outline-success rounded-circle p-2"><FaWhatsapp /></a>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: Contact Form --- */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm p-4 h-100">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Your Name</label>
                    <input type="text" name="name" className="form-control border-0 bg-light p-3" placeholder="Enter Name" required onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Email Address</label>
                    <input type="email" name="email" className="form-control border-0 bg-light p-3" placeholder="Enter Email" required onChange={handleInputChange} />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Subject</label>
                    <input type="text" name="subject" className="form-control border-0 bg-light p-3" placeholder="How can we help?" required onChange={handleInputChange} />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Message</label>
                    <textarea name="message" className="form-control border-0 bg-light p-3" rows="5" placeholder="Write your message here..." required onChange={handleInputChange}></textarea>
                  </div>
                  <div className="col-12 text-end">
                    <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm fw-bold">
                      Send Message <FaPaperPlane className="ms-2 small" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* --- GOOGLE MAPS PLACEHOLDER --- */}
        <div className="mt-5 rounded shadow-sm overflow-hidden" style={{ height: "400px" }}>
            <iframe 
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4493.491434869935!2d90.43797057602302!3d23.752608188690218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b80f8b8a6b9b%3A0x805dc653529512d0!2sSouth%20Banasree%20Central%20Jame%20Masjid!5e1!3m2!1sen!2sbd!4v1769584934805!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
            ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
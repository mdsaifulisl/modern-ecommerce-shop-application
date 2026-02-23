import React, { useState } from "react";
import "../../assets/style/home.css";
import {
  FaLock,
  FaTruck,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaEnvelope,
  FaShoppingBag,
} from "react-icons/fa";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    location: "inside",
  });

  // Demo cart items (later replace with context)
  const cartItems = [
    {
      id: 1,
      productName: "Wireless Headset",
      price: 800,
      quantity: 1,
      image:
        "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      productName: "Smart Watch",
      price: 400,
      quantity: 3,
      image: "https://via.placeholder.com/50",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost = formData.location === "inside" ? 70 : 120;
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const orderData = {
      customer: formData,
      items: cartItems,
      subtotal,
      shippingCost,
      total,
    };

    console.log("Processing Order:", orderData);
    alert(`Order placed successfully! Total: ৳${total}`);
  };

  return (
    <div className="checkout-page bg-light py-5">
      <div className="container">
        <h2 className="fw-bold mb-4">Checkout</h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* LEFT */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4 mb-4">
                <h5 className="mb-4 fw-bold text-primary border-bottom pb-2">
                  <FaTruck className="me-2" /> Shipping & Contact Details
                </h5>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control shadow-none"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control shadow-none"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">
                      <FaPhoneAlt className="me-1 small" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control shadow-none"
                      placeholder="017xxxxxxxx"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">
                      <FaEnvelope className="me-1 small" /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control shadow-none"
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-bold">
                      Full Delivery Address
                    </label>
                    <textarea
                      name="address"
                      rows="2"
                      className="form-control shadow-none"
                      placeholder="House#, Road#, Area"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  {/* LOCATION */}
                  <div className="col-12 mt-4">
                    <label className="form-label small fw-bold text-uppercase text-muted">
                      Delivery Area
                    </label>

                    <div className="row g-2">
                      <div className="col-md-6">
                        <label
                          className={`p-3 border rounded w-100 ${
                            formData.location === "inside"
                              ? "border-primary bg-primary bg-opacity-10"
                              : ""
                          }`}
                          htmlFor="insideDhaka"
                        >
                          <div className="form-check mb-0">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="location"
                              id="insideDhaka"
                              value="inside"
                              checked={formData.location === "inside"}
                              onChange={handleInputChange}
                            />
                            <span className="fw-bold">Inside Dhaka</span>
                            <div className="text-primary small">
                              Delivery Fee: ৳70
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="col-md-6">
                        <label
                          className={`p-3 border rounded w-100 ${
                            formData.location === "outside"
                              ? "border-primary bg-primary bg-opacity-10"
                              : ""
                          }`}
                          htmlFor="outsideDhaka"
                        >
                          <div className="form-check mb-0">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="location"
                              id="outsideDhaka"
                              value="outside"
                              checked={formData.location === "outside"}
                              onChange={handleInputChange}
                            />
                            <span className="fw-bold">Outside Dhaka</span>
                            <div className="text-primary small">
                              Delivery Fee: ৳120
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENT */}
              <div className="card border-0 shadow-sm p-4">
                <h5 className="mb-3 fw-bold border-bottom pb-2">
                  <FaMoneyBillWave className="me-2 text-success" />
                  Payment Method
                </h5>

                <div className="alert alert-secondary border-0 mb-0 d-flex align-items-center">
                  <div
                    className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: 30, height: 30 }}
                  >
                    ✓
                  </div>
                  <div>
                    <strong>Cash on Delivery (COD)</strong>
                    <div className="small text-muted">
                      Pay with cash on delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-4">
              <div
                className="card border-0 shadow-sm p-4"
                style={{ top: 20 }}
              >
                <h5 className="fw-bold mb-4">
                  <FaShoppingBag className="me-2 text-muted" /> Order Summary
                </h5>

                <div
                  className="checkout-products mb-4"
                  style={{ maxHeight: 250, overflowY: "auto" }}
                >
                  {cartItems.map((item) => (
                    <div
                      className="d-flex align-items-center mb-3"
                      key={item.id}
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="rounded border"
                        style={{
                          width: 55,
                          height: 55,
                          objectFit: "cover",
                        }}
                      />
                      <div className="ms-3 flex-grow-1">
                        <div className="small fw-bold">
                          {item.productName}
                        </div>
                        <div className="small text-muted">
                          ৳ {item.price}
                        </div>
                      </div>
                      <div className="fw-bold">
                        ৳ {item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Subtotal</span>
                  <strong>৳ {subtotal}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Shipping</span>
                  <strong>৳ {shippingCost}</strong>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fs-5 fw-bold">Total</span>
                  <span className="fs-5 fw-bold text-primary">
                    ৳ {total}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-pill fw-bold mb-3"
                >
                  Confirm Order
                </button>

                <p className="text-center text-muted small mb-0">
                  <FaLock className="me-1" /> Secure SSL Encryption
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

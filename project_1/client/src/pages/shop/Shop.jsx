import React from "react";
import { useState } from "react";
import "../../assets/style/home.css";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

// components
import Loader from "../../components/Loader";

// Context
import { useProducts } from "../../context/ProductContext";


const Shop = () => {
  const { loading, products } = useProducts();

  const navigate = useNavigate();

  // States
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const priceFilters = [
    { label: "Under ৳500", min: 0, max: 500 },
    { label: "৳500 - ৳1000", min: 500, max: 1000 },
    { label: "৳1000 - ৳1500", min: 1001, max: 1500 },
    { label: "৳1500 - ৳2000", min: 1501, max: 2000 },
    { label: "Over ৳2000", min: 2001, max: Infinity },
  ];

  const handleDetails = (id) => navigate(`/details/${id}`);

  const handleCheckboxChange = (label) => {
    setSelectedRanges((prev) =>
      prev.includes(label) ? prev.filter((r) => r !== label) : [...prev, label],
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPrice =
      selectedRanges.length === 0 ||
      selectedRanges.some((label) => {
        const range = priceFilters.find((r) => r.label === label);
        if (!range) return false;

        return (
          product.discount_price >= range.min &&
          product.discount_price <= range.max
        );
      });

    return matchesSearch && matchesPrice;
  });


  return (
    <>
      <div
        className="shop-page container-fluid h-100 d-flex align-items-center justify-content-center flex-column text-white text-center"
        style={{
          minHeight: "calc(40vh - 70px)",
          // Replace the URL below with your actual image path or URL
          background:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/slider2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="fw-bold display-4">Our Shop</h1>
        <p className="lead text-white">Discover our premium collection of products</p>
      </div>
      <div className="shop-page container-fluid py-4 bg-light min-vh-100">
        <div className="row">
          {/* --- SIDEBAR --- */}
          <div className="col-lg-3">
            {/* selectedRanges */}
            <div
              className={`card border-0 shadow-sm p-4 pb-0 pb-lg-4 mb-4 sticky-top ${selectedRanges.length > 0 ? "pb-4" : ""}`}
              style={{ top: "20px", zIndex: 10 }}
            >
              <div className="d-flex align-items-center mb-4">
                <FaFilter className="me-2 text-primary" />
                <h5 className="mb-0 fw-bold">Filters</h5>
              </div>

              {/* Search Input */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-muted">
                  Search Product
                </label>
                <div className="input-group border rounded-pill overflow-hidden bg-white">
                  <span className="input-group-text bg-transparent border-0">
                    <FaSearch className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="What are you looking for?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-4">
                {/* Mobile Toggle Button - Visible only on mobile */}
                <div
                  className="d-flex d-lg-none justify-content-between align-items-center mb-0 mb-lg-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    (setIsPriceOpen(!isPriceOpen), setSelectedRanges([]));
                  }}
                >
                  <label className="form-label small fw-bold text-uppercase text-muted mb-0">
                    Price Range
                  </label>
                  <span className="text-muted small">
                    {isPriceOpen ? "▲" : "▼"}
                  </span>
                </div>

                {/* Desktop Label - Visible only on large screens */}
                <label className="form-label d-none d-lg-block small fw-bold text-uppercase text-muted">
                  Price Range
                </label>

                {/* Checkbox List - Hidden on mobile unless isPriceOpen is true */}
                <div
                  className={`${isPriceOpen ? "d-block" : "d-none"} d-lg-block ms-1 mt-2 mt-lg-0`}
                >
                  {priceFilters.map((range, index) => (
                    <div
                      className="form-check custom-checkbox mb-2"
                      key={index}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedRanges.includes(range.label)}
                        id={`price-${index}`}
                        onChange={() => handleCheckboxChange(range.label)}
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`price-${index}`}
                      >
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              {(selectedRanges.length > 0 || searchTerm) && (
                <button
                  className="btn btn-outline-danger btn-sm w-100 rounded-pill mt-2"
                  onClick={() => {
                    setSelectedRanges([]); // Unchecks all boxes
                    setSearchTerm(""); // Clears search input
                    setIsPriceOpen(false); // Closes the mobile menu (optional)
                  }}
                >
                  <FaTimes className="me-1" /> Clear All
                </button>
              )}
            </div>
          </div>

          {/* --- PRODUCT GRID --- */}
          <div className="col-lg-9">
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-md-center mb-4">
              <div>
                {/* <h2 className="fw-bold mb-1">Our Collections</h2> */}
                <p className="text-muted mb-0">
                  Showing {filteredProducts.length} results
                </p>
              </div>
            </div>
            {/* col-6 col-md-4 col-xl-3 */}
            <div className="row g-lg-4 g-1 pb-0 pb-md-3 pb-lg-5 ">
              {loading ? (
                <Loader />
              ) : (
                <ProductCard filteredProducts={filteredProducts} handleDetails={handleDetails} />
              )}
              
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-5 bg-white rounded shadow-sm mt-4">
                <h5 className="text-muted">Oops! No products found.</h5>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

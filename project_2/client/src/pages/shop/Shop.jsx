import React, { useState } from "react";
import "../../assets/style/home.css";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";

import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";

import { useProducts } from "../../context/ProductContext";

const Shop = () => {
  const { loading, products } = useProducts();
  const navigate = useNavigate();

  /* =====================
     States
  ===================== */
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  /* =====================
     Price Ranges
  ===================== */
  const priceFilters = [
    { label: "Under ৳500", min: 0, max: 500 },
    { label: "৳500 - ৳1000", min: 500, max: 1000 },
    { label: "৳1000 - ৳1500", min: 1001, max: 1500 },
    { label: "৳1500 - ৳2000", min: 1501, max: 2000 },
    { label: "Over ৳2000", min: 2001, max: Infinity },
  ];

  /* =====================
     Handlers
  ===================== */
  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const handleCheckboxChange = (label) => {
    setSelectedRanges((prev) =>
      prev.includes(label)
        ? prev.filter((r) => r !== label)
        : [...prev, label]
    );
  };

  /* =====================
     Filter Products
  ===================== */
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const price = product.discount_price || product.price;

    const matchesPrice =
      selectedRanges.length === 0 ||
      selectedRanges.some((label) => {
        const range = priceFilters.find((r) => r.label === label);

        return range && price >= range.min && price <= range.max;
      });

    return matchesSearch && matchesPrice;
  });

  /* =====================
     UI
  ===================== */
  return (
    <>
      {/* ================= Banner ================= */}
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center text-center text-white"
        style={{
          minHeight: "40vh",
          background: `
            linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
            url('/slider2.png')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="fw-bold">Our Shop</h1>
        <p className="lead">
          Discover our premium collection of products
        </p>
      </div>

      {/* ================= Main ================= */}
      <div className="container py-4 bg-light min-vh-100">

        <div className="row">

          {/* ================= Sidebar ================= */}
          <div className="col-lg-3 mb-4">

            <div
              className="card border-0 shadow-sm p-4 "
              style={{ top: "20px" }}
            >
              {/* Title */}
              <div className="d-flex align-items-center mb-4">
                <FaFilter className="me-2 text-primary" />
                <h5 className="mb-0 fw-bold">Filters</h5>
              </div>

              {/* Search */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">
                  Search Product
                </label>

                <div className="input-group rounded-pill overflow-hidden bg-white border">
                  <span className="input-group-text bg-transparent border-0">
                    <FaSearch className="text-muted" />
                  </span>

                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">

                {/* Mobile Toggle */}
                <div
                  className="d-flex d-lg-none justify-content-between align-items-center mb-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                >
                  <span className="small fw-bold text-muted">
                    Price Range
                  </span>

                  <span className="small text-muted">
                    {isPriceOpen ? "▲" : "▼"}
                  </span>
                </div>

                {/* Desktop Label */}
                <label className="d-none d-lg-block small fw-bold text-muted mb-2">
                  Price Range
                </label>

                {/* Checkbox */}
                <div
                  className={`${isPriceOpen ? "d-block" : "d-none"} d-lg-block`}
                >
                  {priceFilters.map((range, index) => (
                    <div className="form-check mb-2" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedRanges.includes(range.label)}
                        id={`price-${index}`}
                        onChange={() =>
                          handleCheckboxChange(range.label)
                        }
                      />

                      <label
                        className="form-check-label small"
                        htmlFor={`price-${index}`}
                      >
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {(selectedRanges.length > 0 || searchTerm) && (
                <button
                  className="btn btn-outline-danger btn-sm w-100 rounded-pill"
                  onClick={() => {
                    setSelectedRanges([]);
                    setSearchTerm("");
                    setIsPriceOpen(false);
                  }}
                >
                  <FaTimes className="me-1" /> Clear All
                </button>
              )}

            </div>
          </div>

          {/* ================= Products ================= */}
          <div className="col-lg-9">

            {/* Header */}
            <div className="mb-3">
              <p className="text-muted mb-0">
                Showing {filteredProducts.length} results
              </p>
            </div>

            {/* Grid */}
            <div className="row g-2 g-lg-4">

              {loading ? (
                <Loader />
              ) : (
                <ProductCard
                  filteredProducts={filteredProducts}
                  handleDetails={handleDetails}
                />
              )}

            </div>

            {/* Empty */}
            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-5 bg-white rounded shadow-sm mt-4">
                <h5 className="text-muted">No products found</h5>
                <p>Try different search or filters</p>
              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
};

export default Shop;

import React from "react";

const ProductCard = ({ filteredProducts, handleDetails }) => {
  return (
    <>
      {filteredProducts.map((product) => {
        // Calculate discount percentage
        const hasDiscount = product.price !== product.discount_price;
        const discountPercentage = hasDiscount
          ? Math.round(
              ((product.price - product.discount_price) / product.price) * 100,
            )
          : 0;

        return (
          <div className="col-6 col-md-4 col-xl-3 mb-4" key={product.id}>
            <div
              className="dashboard-content bg-white h-100 position-relative overflow-hidden shadow-sm d-flex flex-column transition-all"
              style={{
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              onClick={() => handleDetails(product.id)}
            >
              {/* Discount Badge */}
              {hasDiscount && (
                <div
                  className="position-absolute px-2 py-1 small fw-bold text-white shadow-sm"
                  style={{
                    top: "10px",
                    left: "10px",
                    background: "var(--red-color)",
                    borderRadius: "5px",
                    zIndex: 2,
                  }}
                >
                  {discountPercentage}% OFF
                </div>
              )}

              {/* Image Section */}
              {/* Image Section - Perfect for 300x300 */}
              <div className="ratio ratio-1x1 overflow-hidden bg-light">
                <img
                  src={product.image}
                  className="w-100 h-100 transition-all"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  alt={product.productName}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              {/* Content Section */}
              <div className="p-3 d-flex flex-column flex-grow-1">
                <h6
                  className="mb-2 text-truncate"
                  style={{ color: "var(--text-color)", fontSize: "0.95rem" }}
                >
                  {product.productName}
                </h6>

                <div className="mb-3 d-flex align-items-center gap-2 flex-wrap">
                  <span
                    className="fw-bold fs-5"
                    style={{ color: "var(--green-color)" }}
                  >
                    ৳ {product.discount_price}
                  </span>

                  {hasDiscount && (
                    <span
                      className="text-muted text-decoration-line-through small"
                      style={{ fontSize: "0.8rem" }}
                    >
                      ৳ {product.price}
                    </span>
                  )}
                </div>

                <button
                  className="upload-btn w-100 py-2 mt-auto border-0 shadow-sm"
                  style={{ borderRadius: "8px", fontSize: "0.9rem", background: "var(--primary-color)" }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from triggering
                    handleDetails(product.id);
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;

import React from "react";

const ProductCard = ({ filteredProducts, handleDetails }) => {
  return (
    <>
      {filteredProducts.map((product) => {
        const hasDiscount =
          Number(product.discount_price) > 0 &&
          Number(product.discount_price) < Number(product.price);

        const discountPercentage = hasDiscount
          ? Math.round(
              ((Number(product.price) - Number(product.discount_price)) /
                Number(product.price)) *
                100,
            )
          : 0;

        const displayPrice = hasDiscount
          ? Number(product.discount_price)
          : Number(product.price);

        return (
          <div className="col-6 col-md-4 col-xl-3 mb-4" key={product._id}>
            <div
              className="dashboard-content bg-white h-100 position-relative overflow-hidden shadow-sm d-flex flex-column"
              style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              onClick={() => handleDetails(product._id)}
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

              {/* Image */}
              <div className="ratio ratio-1x1 overflow-hidden bg-light">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              {/* Content */}
              <div className="p-3 d-flex flex-column flex-grow-1">
                <h6
                  className="mb-2 text-truncate"
                  style={{ color: "var(--text-color)", fontSize: "0.95rem" }}
                >
                  {product.productName}
                </h6>

                {/* Price */}
                <div className="mb-3 d-flex align-items-center gap-2 flex-wrap">
                  <span
                    className="fw-bold fs-5"
                    style={{ color: "var(--green-color)" }}
                  >
                    ৳ {displayPrice}
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
                  style={{
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    background: "var(--primary-color)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDetails(product._id);
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

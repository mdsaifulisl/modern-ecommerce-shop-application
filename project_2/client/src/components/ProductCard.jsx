const ProductCard = ({ filteredProducts, handleDetails }) => {
  return (
    <>
      {filteredProducts.map((product) => {
        const hasDiscount =
          Number(product.discount_price) > 0 &&
          Number(product.discount_price) < Number(product.price);

        const discountPercentage = hasDiscount
          ? Math.round(
              ((product.price - product.discount_price) / product.price) * 100,
            )
          : 0;

        const displayPrice = hasDiscount
          ? product.discount_price
          : product.price;

        return (
          <div className="col-6 col-md-4 col-xl-3" key={product._id}>
            <div
              className="product-shop-card"
              onClick={() => handleDetails(product._id)}
            >
              {/* Discount Badge */}
              {hasDiscount && (
                <div className="product-shop-badge">
                  {discountPercentage}% OFF
                </div>
              )}

              {/* Image */}
              <div className="product-shop-img">
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.productName}
                  onMouseOver={(e) => {
                    if (product.images?.[1])
                      e.currentTarget.src = product.images[1];
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.src =
                      product.images?.[0] || "/placeholder.png";
                  }}
                />
              </div>

              {/* Body */}
              <div className="product-shop-body">
                {/* Title */}
                <h6 className="m-0 p-0 mb-2">
                  {product.productName.length > 20
                    ? product.productName.slice(0, 20) + "..."
                    : product.productName}
                </h6>

                {/* Sub text */}
                {/* <p className="product-shop-desc">Premium Quality Product</p> */}

                {/* Price */}
                <div className="product-shop-price d-flex flex-column flex-md-row align-items-start">
                  <span className="product-current">৳ {displayPrice}</span>

                  {hasDiscount && (
                    <>
                      <span className="product-old">৳ {product.price}</span>

                      {/* <span className="product-discount">
                        ({discountPercentage}% OFF)
                      </span> */}
                    </>
                  )}
                </div>

                {/* Button */}
                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDetails(product._id);
                  }}
                >
                  BUY NOW
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

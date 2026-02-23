import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/style/details.css";

// Components
import Loader from "../../components/Loader";

// Context
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getByProductId } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [bgPosition, setBgPosition] = useState("center");
  const [selectedImage, setSelectedImage] = useState(""); // ✅ selected image for zoom

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getByProductId(id);
      setProduct(data);
      setSelectedImage(data.images?.[0] || ""); // default first image
    };
    loadProduct();
  }, [id, getByProductId]);

  if (!product) return <Loader />;

  const price = Number(product.price);
  const discountPrice = Number(product.discount_price || 0);
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const displayPrice = hasDiscount ? discountPrice : price;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return false;
    }

    const cartItem = {
      id: product._id,
      productName: product.productName,
      price: displayPrice,
      image: selectedImage, // use selected image
    };

    addToCart(cartItem, selectedSize, quantity);
    setSelectedSize("");
    return true;
  };

  const handleOrderNow = () => {
    const success = handleAddToCart();
    if (success) navigate("/checkout");
  };

  return (
    <section className="product-details section">
      <div className="container">
        <div className="row g-4 ">
          {/* Zoom Image */}
          <div className="col-md-6">
            <div
              className="zoom-image"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundPosition: bgPosition,
                backgroundSize: "100%",
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setBgPosition(`${x}% ${y}%`);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundSize = "150%";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundSize = "100%";
                setBgPosition("center");
              }}
            ></div>

            {/* Thumbnail Images */}
            {product.images?.length > 1 && (
              <div className="d-flex gap-2 mt-3 flex-wrap">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.productName}-${idx}`}
                    className={`thumbnail-img border rounded ${
                      selectedImage === img ? "border-primary" : ""
                    }`}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <h4 className="mb-3">{product.productName}</h4>

            {/* Price */}
            <div className="mb-3">
              <span className="discount-price fs-4">৳ {displayPrice}</span>
              {hasDiscount && (
                <span className="original-price ms-3">৳ {price}</span>
              )}
            </div>

            {/* Sizes */}
            <div className="mb-3">
              <strong className="d-block mb-2">Select Size</strong>
              <div className="size-options">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "bg-primary" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-3 d-flex align-items-center gap-3">
              <strong>Quantity:</strong>
              <div className="qty-control">
                <button
                  className="qty-btn m-0 p-0"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  className="qty-btn m-0 p-0"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {product.stock <= 0 && <p>Out of Stock</p>}

            {/* Buttons */}
            <div className="d-flex gap-3">
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-yellow"
                onClick={handleOrderNow}
                disabled={product.stock <= 0}
              >
                Order Now
              </button>
            </div>
            {/* Description */}
            {product.description && (
              <>
                <hr className="my-5" />
                <div>
                  <h6 className="mt-5">Description</h6>
                  <h6 className="mb-3">{product.productName}</h6>
                  <p>{product.description}</p>
                </div>
              </>
            )}

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;

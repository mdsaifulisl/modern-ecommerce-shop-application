import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../../data/data.json";
import "../../assets/style/details.css";

// Context
import { useCart } from "../../context/CartContext";

const Details = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const { products = [] } = data;
  const product = products.find((item) => item.id === Number(id));

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1); 
  const [bgPosition, setBgPosition] = useState("center");


  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h4>Product not found</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  // Image zoom handler
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setBgPosition(`${x}% ${y}%`);
  };

  // Add to cart handler


const handleAddToCart = () => {
  if (!selectedSize) {
    alert("Please select a size");
    return;
  }

  const cartItem = {
    id: product.id,
    name: product.productName,
    size: selectedSize,
    quantity: quantity,
    price: product.discount_price,
    image: product.image,
  };

  addToCart(cartItem, selectedSize, quantity);
  setSelectedSize("");
  console.log("Cart Item:", cartItem); // <-- should log
  alert(`Added ${cartItem.quantity} item(s) of size ${cartItem.size} to cart!`);
};

const handleAddToCartNavigateChackout = () => {
  if (!selectedSize) {
    alert("Please select a size");
    return;
  }

  const cartItem = {
    id: product.id,
    name: product.productName,
    size: selectedSize,
    quantity: quantity,
    price: product.discount_price,
    image: product.image,
  };

  addToCart(cartItem, selectedSize, quantity);
  setSelectedSize("");
   navigate("/checkout");
  console.log("Cart Item:", cartItem); // <-- should log
};  

  return (
    <section className="product-details section">
      <div className="container">
        <div className="row g-4 align-items-center">
          {/* Image Zoom */} 
          <div className="col-md-6">
            <div
              className="zoom-image"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundPosition: bgPosition,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setBgPosition("center")}
            >
              <img src={product.image} alt={product.productName} />
            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <h4 className="mb-3">{product.productName}</h4>

            <div className="mb-3">
              <span className="discount-price fs-4">
                ৳ {product.discount_price}
              </span>
              {product.price !== product.discount_price && (
                <span className="original-price ms-3">৳ {product.price}</span>
              )}
            </div>

            {/* Size Select */}
            <div className="mb-3">
              <strong className="d-block mb-2">Select Size</strong>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-3 d-flex align-items-center gap-3">
              <strong>Quantity:</strong>
              <div className="qty-control">
                <button
                  className="qty-btn decrease"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  className="qty-btn increase"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mb-3">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn btn-primary" onClick={handleAddToCartNavigateChackout}>
                Order Now
              </button>
            </div>

           
          </div>
        </div>
        <hr className="my-5" />
        <div className="mt-5">
            <h6 className="mb-3">{product.productName}</h6>
            <p>{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default Details;

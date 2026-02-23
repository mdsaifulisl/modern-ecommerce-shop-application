import React from "react";
import "../../assets/style/home.css";
import { useNavigate } from "react-router-dom";

// Icon
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "../ProductCard";

// product Context
import { useProducts } from "../../context/ProductContext";

// Loader
import Loader from "../Loader";

const Featured = () => {
  const { products = [] } = useProducts(); // products array
  const productss = products.slice(0, 8); // প্রথম ৮টি product

  const Naviget = useNavigate();

  const handleClick = (id) => {
    Naviget(`/details/${id}`);
  };

  const handelShop = () => {
    Naviget("/shop");
  };

  return (
    <div>
      {(productss.length > 0 && (
        <section className="featured-section py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h3 className="section-title p-0 m-0">Featured Products</h3>
              <p className="text-muted text-center">
                Check out our featured products
              </p>
            </div>

            <div className="row g-lg-4 g-2 pb-0 pb-md-3 pb-lg-5 ">
              <ProductCard
                filteredProducts={productss}
                handleDetails={handleClick}
              />
            </div>

            <div className="text-center">
              <button onClick={handelShop} className="btn btn-outline">
                View All Products <FaArrowRight className="ms-2" />
              </button>
            </div>
          </div>
        </section>
      )) || (
        <div className="text-center py-5 bg-white rounded shadow-sm mt-4">
          <h5 className="text-muted">Oops! No products found.</h5>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default Featured;

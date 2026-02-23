import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaTrash,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import "../assets/style/header.css";

// Context
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { admin } = useAuth();
  const location = useLocation();
  // Use everything from context
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    cardLength,
    getCartCount,
  } = useCart();

  const [headerActive, setHeaderActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setHeaderActive(true);
      } else {
        setHeaderActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

    // Fetch visits on component mount
  }, []);

  // Handlers now call context functions
  const increaseQty = (id, size) => {
    updateQuantity(id, size, 1);
  };

  const decreaseQty = (id, size) => {
    updateQuantity(id, size, -1);
  };

  if (location.pathname.startsWith("/dashboard")) {
    return null; // Header completely hidden
  }

  return (
    <>
      <header className={`navbar px-lg-3 px-2 ${headerActive ? "active" : ""}`}>
        <div className="container-fluid navbar-inner">
          <div className="logo">
            <NavLink to="/">
              <h5 style={{ color: "var(--primary-color)" }}>Your Logo</h5>
            </NavLink>
          </div>

          <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>

            {admin && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          <div className="nav-actions">
            {!admin && (
              <NavLink to="/login">
                <FaUser size={18} />
              </NavLink>
            )}

            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              <FaShoppingCart size={18} />
              {cardLength > 0 && (
                <span className="cart-count">{cardLength}</span>
              )}
            </button>

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      )}

      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h5>Your Cart ({cardLength})</h5>
          <button onClick={() => setCartOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="text-center py-5">No items in cart</p>
          ) : (
            cartItems.map((item) => (
              /* Use combined id and size for a truly unique key */
              <div className="cart-item" key={`${item.id}-${item.size}`}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <p className="cart-item-title">{item.name}</p>
                  <small>Size: {item.size}</small>
                  <small>price: {item.price}</small>

                  <div className="cart-item-bottom">
                    <div className="qty-control">
                      <button
                        className="qty-btn decrease"
                        onClick={() => decreaseQty(item.id, item.size)}
                      >
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="qty-btn increase"
                        onClick={() => increaseQty(item.id, item.size)}
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <strong>
                      ৳ {(item.discount_price || item.price) * item.quantity}
                    </strong>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id, item.size)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total quantity:</span>
            <strong>{getCartCount()}</strong>
          </div>
          <div className="cart-total">
            <span>Total:</span>
            <strong>৳ {getSubtotal()}</strong>
          </div>

          <NavLink
            to="/checkout"
            className="btn btn-primary"
            onClick={() => setCartOpen(false)}
          >
            Checkout
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;

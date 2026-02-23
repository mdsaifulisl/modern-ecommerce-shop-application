import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaShoppingBag, FaPrint, FaHome } from "react-icons/fa";
import confetti from "canvas-confetti"; // Optional: npm install canvas-confetti

// constext
import { useOrders } from "../../context/OrderContext";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { verifyOrder } = useOrders();

 useEffect(() => {
  const checkOrder = async () => {
    const result = await verifyOrder(orderId);
    if (result.success) {
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#28a745", "#20c997", "#ffffff"],
      });
    } else {
      navigate("/");
    }
  };

  checkOrder();
}, [orderId, verifyOrder, navigate]);


  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 text-center">
          {/* Success Icon */}
          <div className="mb-4 animate-bounce">
            <FaCheckCircle size={80} color="var(--green-color)" />
          </div>

          <h4 className="fw-bold mb-2">Thank You for Your Order!</h4>
          <p className="text-muted mb-4">
            Your order has been placed successfully. We'll send you a confirmation email shortly.
          </p>

          {/* Order Info Card */}
          <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ backgroundColor: "#fcfcfd" }}>
            <div className="card-body p-4">
              <span className="text-muted small text-uppercase fw-bold">Order ID</span>
              <h4 className="text-color mt-1 mb-3">#{orderId.slice(0, 5)}</h4>
              
              <div className="d-flex justify-content-center gap-2 small text-muted">
                <FaShoppingBag />
                <span>Status: <strong>Pending Confirmation</strong></span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
            <Link 
              to="/" 
              className="btn btn-lg px-4 py-3 d-flex align-items-center gap-2 text-white" 
              style={{ backgroundColor: "var(--green-color)", borderRadius: "12px", border: "none" }}
            >
              <FaHome /> Back to Home
            </Link>
            
            <button 
              onClick={handlePrint}
              className="btn btn-lg px-4 py-3 d-flex align-items-center gap-2 btn-light border"
              style={{ borderRadius: "12px" }}
            >
              <FaPrint /> Print Receipt
            </button>
          </div>

          <p className="mt-5 smaller text-muted">
            Need help? <Link to="/contact" className="d-link-color">Contact our support team</Link>
          </p>
        </div>
      </div>

      {/* CSS for simple print styling */}
      <style>{`
        @media print {
          .btn, .mt-5, .animate-bounce, footer, nav { display: none !important; }
          .container { margin-top: 0 !important; }
          .card { border: 1px solid #ddd !important; box-shadow: none !important; }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-20px);}
          60% {transform: translateY(-10px);}
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;
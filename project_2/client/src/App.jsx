// React Router Dom
import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate

// Context
import { useAuth } from "./context/AuthContext";

// component
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

// pages
import Login from "./pages/login/Login";
import Home from "./pages/home/HomePage";
import Details from "./pages/details/Details";
import Shop from "./pages/shop/Shop";
import Checkout from "./pages/checkout/Checkout";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Dashbord from "./pages/dashboardPage/Dashboard";
import OrderSuccess from "./pages/orderSuccess/OrderSuccess";
import PrintInvoice from "./pages/PrintInvoice/PrintInvoice";

// Corrected ProtectedRoute
const PublicRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  // যদি admin already login থাকে → dashboard এ পাঠাও
  return admin ? <Navigate to="/dashboard" replace /> : children;
};

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return admin ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Header />
      <ScrollTop />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashbord />
              </ProtectedRoute>
            }
          />

          <Route path="/details/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/print-invoice" element={<PrintInvoice />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />{" "}
              </PublicRoute>
            }
          />

          {/* Optional: Catch-all route for 404s */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

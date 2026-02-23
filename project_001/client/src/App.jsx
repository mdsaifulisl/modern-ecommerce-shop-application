// React Router Dom
import { Routes, Route } from "react-router-dom"

// Context

// component
import Header from "./components/Header"
import Footer from "./components/Footer"
import ScrollTop from "./components/ScrollTop"

// pages
import Login from "./pages/login/Login"
import Home from "./pages/home/HomePage"
import Details from "./pages/details/Details"
import Shop from "./pages/shop/Shop"
import Checkout from "./pages/checkout/Checkout"
import About from "./pages/about/About"
import Contact from "./pages/contact/Contact"
import Dashbord from "./pages/dashboardPage/Dashboard"

function App() {

  return (
    <>
      <Header />
      <ScrollTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashbord />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

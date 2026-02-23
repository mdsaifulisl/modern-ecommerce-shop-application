import { FaPowerOff, FaShoppingBag } from "react-icons/fa";
import { MdOutlineShoppingCart, MdDashboard } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { BiSlider } from "react-icons/bi";
import {  IoIosSettings } from "react-icons/io";

function Sidebar({ handleSidebar, contant, setContant }) {
  
  // 1. Data array to avoid repeating the same HTML 4 times
  const menuItems = [
    { id: 1, label: "Dashboard", icon: <MdDashboard /> },
    { id: 2, label: "Order", icon: <MdOutlineShoppingCart /> },
    { id: 3, label: "Products", icon: <FaShoppingBag /> },
    { id: 4, label: "Slider", icon: <BiSlider /> },
    { id: 5, label: "Settings", icon: <IoIosSettings /> },
  ];

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear localStorage, redirect)
    console.log("Logging out...");
  };

  return (
    <div className="dashboard-sidebar position-relative pt-5">
      {/* Mobile Close Button */}
      <div className="d-block d-lg-none position-absolute top-0 end-0 fs-3 p-2">
        <TiDelete 
          className="cursor-pointer" 
          onClick={handleSidebar} 
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Logout Header */}
      <div 
        className="dashboard-sidebar-header-icon mb-4 d-flex align-items-center gap-2" 
        onClick={handleLogout}
        style={{ cursor: 'pointer' }}
      >
        <FaPowerOff className="text-danger" />
        <span className="fw-bold">Logout</span>
      </div>

      {/* Sidebar Navigation Body */}
      <div className="dashboard-sidebar-body d-flex flex-column gap-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`dashboard-sidebar-body-group p-2 rounded-2 d-flex align-items-center gap-3 transition-all ${
              contant === item.id ? "active bg-primary text-white" : ""
            }`}
            onClick={() => {
              setContant(item.id);
              handleSidebar(); // Closes sidebar on mobile after selection
            }}
            style={{ cursor: 'pointer' }}
          >
            <span className="fs-5">{item.icon}</span>
            <p className="m-0">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
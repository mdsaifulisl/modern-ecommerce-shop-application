import { FaPowerOff, FaShoppingBag, FaHome } from "react-icons/fa";
import { MdOutlineShoppingCart, MdDashboard } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { IoIosSettings } from "react-icons/io";
import { VscFileMedia } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

// Auth context
import { useAuth } from "../../context/AuthContext";
import { useVisit } from "../../context/VisitContext";

function Sidebar({ handleSidebar, contant, setContant }) {
  const { serverStatus } = useVisit();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/", { replace: true });
  };

  const menuItems = [
    { id: 1, label: "Dashboard", icon: <MdDashboard /> },
    { id: 2, label: "Order", icon: <MdOutlineShoppingCart /> },
    { id: 3, label: "Products", icon: <FaShoppingBag /> },
    { id: 4, label: "Media", icon: <VscFileMedia /> },
    { id: 5, label: "Settings", icon: <IoIosSettings /> },
  ];

  return (
    <div className="dashboard-sidebar position-relative pt-5">
      {/* Mobile Close Button */}
      <div
        className="d-block d-lg-none position-absolute top-0 fs-3 p-2"
        style={{ right: -50 }}
      >
        <TiDelete
          className="cursor-pointer fs-1"
          onClick={handleSidebar}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Logout */}
      <div
        className="dashboard-sidebar-header-icon mb-4 d-flex align-items-center gap-2"
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
      >
        <FaPowerOff className="text-danger" />
        <span className="fw-bold">Logout</span>
      </div>

      {/* Menu */}
      <div className="dashboard-sidebar-body d-flex flex-column gap-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`dashboard-sidebar-body-group p-2 rounded-2 d-flex align-items-center gap-3 ${
              contant === item.id ? "active bg-primary text-white" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();        
              setContant(item.id);      
              handleSidebar();          
            }}
            style={{ cursor: "pointer" }}
          >
            <span className="fs-5">{item.icon}</span>
            <p className="m-0">{item.label}</p>
          </div>
        ))}
        <div
            className={`dashboard-sidebar-body-group p-2 rounded-2 d-flex align-items-center gap-3`}
            onClick={() => {
              handleHome();      
            }}
            style={{ cursor: "pointer" }}
          >
            <span className="fs-5"> <FaHome /></span>
            <p className="m-0">Home</p>
          </div>
        <div className="dashboard-sidebar-body-group p-2 rounded-2 d-flex align-items-center gap-3">{serverStatus}</div>
      </div>
    </div>
  );
}

export default Sidebar;

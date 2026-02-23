import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/dashboard-components/deshbord.css";

// Components
import Sidebar from "../../components/dashboard-components/Sidebars";
import ContantHead from "../../components/dashboard-components/Contant-head";
import DeshbordHome from "../../components/dashboard-components/DeshbordHome";
import OrderList from "../../components/dashboard-components/OrderList";
import ProductList from "../../components/dashboard-components/ProductList";
import AddMedia from "../../components/dashboard-components/AddMedia";
import Settings from "../../components/dashboard-components/Settings";
import Inbox from "../../components/dashboard-components/Inbox";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Auto-close sidebar on scroll (Mobile Optimization)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSidebarOpen]);

  // Map content for cleaner rendering
  const renderContent = () => {
    switch (activeTab) {
      case 1: return <DeshbordHome />;
      case 2: return <OrderList />;
      case 3: return <ProductList />;
      case 4: return <AddMedia />;
      case 5: return <Settings />;
      case 6: return <Inbox />;
      default: return <DeshbordHome />;
    }
  };

  return (
    <div className="dashboard-wrapper bg-light min-vh-100">
      <div className="container-fluid p-0">
        <div className="row g-0">
          
          {/* Sidebar Overlay for Mobile */}
          {isSidebarOpen && (
            <div 
              className="sidebar-overlay d-lg-none" 
              onClick={toggleSidebar}
            />
          )}

          {/* Sidebar Column */}
          <div className={`col-auto dashboard-sidebar-container px-5 ${isSidebarOpen ? "show bg-white" : ""}`}>
            <Sidebar
              handleSidebar={toggleSidebar}
              contant={activeTab}
              setContant={setActiveTab}
            />
          </div>

          {/* Main Content Column */}
          <div className="col">
            <div className="dashboard-content-area p-3 p-md-4">
              <ContantHead handleSidebar={toggleSidebar} setContant={setActiveTab} />
              
              <main className="content-body mt-4 animate-fade-in">
                {renderContent()}
              </main>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
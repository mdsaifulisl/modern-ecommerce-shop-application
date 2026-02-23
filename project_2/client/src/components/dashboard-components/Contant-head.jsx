import React, { useEffect } from "react";
import { IoMdNotifications } from "react-icons/io";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

// Context
import { useOrders } from "../../context/OrderContext";
import { useContacts } from "../../context/ContactContext";
import { useVisit } from "../../context/VisitContext";
import { useAuth } from "../../context/AuthContext";

function ContentHead({ handleSidebar, setContant }) {
  const { admin } = useAuth();
  const { visits } = useVisit();
  const { messages, fetchMessages } = useContacts();
  // Logic-ready states (example counts)
  const { orders } = useOrders();
  
  

  const totalRevenue = orders
    .filter((order) => order.status === "Delivered")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);
  // ...existing code...
  const handleMessageClick = () => {
    setContant(6);
  };
  const hendleNotificationClick = () => {
    setContant(2);
  };

  const filerMessage = messages.filter((msg) => msg.status === "unread").length;
  const messageCount = filerMessage > 0 ? filerMessage : null;

  const handleNotificationfilter = orders.filter(
    (order) => order.status === "Pending"
  ).length;
  const notifyCount = handleNotificationfilter > 0 ? handleNotificationfilter : null;

  useEffect(() => {
    fetchMessages();
    
  }, [fetchMessages]);

  return (
    <div className="dashboard-main-head py-3 px-4 d-flex justify-content-between align-items-center bg-white border-bottom">
      {/* Left: Financial Overview */}
      <div className="view">
        <h6 className="text-muted small fw-bold text-uppercase mb-1">
          Total Revenue
        </h6>
        <div className="d-flex flex-wrap align-items-baseline gap-2">
          <h4 className="text-success fw-bold mb-0">
            $ {totalRevenue.toFixed(2)}
          </h4>
          <span className="d-inline text-muted small">
            | Total views{" "}
            <span className="text-success fw-semibold">{visits}</span>
          </span>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="notifications d-flex align-items-center gap-2 gap-md-4">
        {/* Messages */}
        <div
          className="position-relative p-2 pointer hover-bg-light rounded shadow-sm"
          style={{ cursor: "pointer" }}
          onClick={handleMessageClick}
        >
          <FaMessage className="fs-5 text-secondary" />
          {messageCount > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light"
              style={{ fontSize: "0.6rem" }}
            >
              {messageCount}
            </span>
          )}
        </div>

        {/* Notifications */}
        <div
          className="position-relative p-2 pointer hover-bg-light rounded shadow-sm"
          style={{ cursor: "pointer" }} onClick={hendleNotificationClick}
        >
          <IoMdNotifications className="fs-4 text-secondary" />
          {notifyCount > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light"
              style={{ fontSize: "0.6rem" }}
            >
              {notifyCount}+
            </span>
          )}
        </div>

        {/* Desktop Profile (Hidden on Mobile) */}
        <div className="d-none d-md-flex align-items-center gap-2 border-start ps-4 pointer">
          <div className="text-end">
            <p className="mb-0 fw-bold small">{admin.email}</p>
            <p className="mb-0 text-muted" style={{ fontSize: "0.7rem" }}>
              Super Admin
            </p>
          </div>
          <FaUserCircle className="fs-2 text-primary" />
        </div>

        {/* Mobile Sidebar Toggle */}
        <button
          className="btn btn-light d-lg-none p-2 shadow-sm"
          onClick={handleSidebar}
        >
          <FaBars className="fs-5" />
        </button>
      </div>
    </div>
  );
}

export default ContentHead;

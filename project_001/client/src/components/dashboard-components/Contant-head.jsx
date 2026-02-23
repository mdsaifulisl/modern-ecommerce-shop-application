import { IoMdNotifications } from "react-icons/io";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

function ContentHead({ handleSidebar }) {
  // Logic-ready states (example counts)
  const messageCount = 3;
  const notifyCount = 5;

  return (
    <div className="dashboard-main-head py-3 px-1 d-flex justify-content-between align-items-center bg-white border-bottom">
      {/* Left: Financial Overview */}
      <div className="view">
        <h6 className="text-muted small fw-bold text-uppercase mb-1">Total Revenue</h6>
        <div className="d-flex align-items-baseline gap-2">
          <h4 className="text-success fw-bold mb-0">$ 1,000.00</h4>
          <span className="d-none d-md-inline text-muted small">
            | Total views <span className="text-success fw-semibold">3,000</span>
          </span>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="notifications d-flex align-items-center gap-2 gap-md-4">
        
        {/* Messages */}
        <div className="position-relative p-2 pointer hover-bg-light rounded shadow-sm" style={{ cursor: "pointer" }}>
          <FaMessage className="fs-5 text-secondary" />
          {messageCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" style={{ fontSize: '0.6rem' }}>
              {messageCount}
            </span>
          )}
        </div>

        {/* Notifications */}
        <div className="position-relative p-2 pointer hover-bg-light rounded shadow-sm" style={{ cursor: "pointer" }}>
          <IoMdNotifications className="fs-4 text-secondary" />
          {notifyCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" style={{ fontSize: '0.6rem' }}>
              {notifyCount}+
            </span>
          )}
        </div>

        {/* Desktop Profile (Hidden on Mobile) */}
        <div className="d-none d-md-flex align-items-center gap-2 border-start ps-4 pointer">
          <div className="text-end">
            <p className="mb-0 fw-bold small">Admin Name</p>
            <p className="mb-0 text-muted" style={{ fontSize: '0.7rem' }}>Super Admin</p>
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
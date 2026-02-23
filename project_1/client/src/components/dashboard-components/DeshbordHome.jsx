import { useEffect} from "react";
import TrendChart from "./TrendChart";

// context
import { useOrders } from "../../context/OrderContext";

const DashboardHome = () => {
  const { orders, fetchAllOrders } = useOrders();
  const orderStatuses = ["Shipped", "Pending", "Cancelled"];

  const orderStatusCounts = orderStatuses.reduce((acc, status) => {
    acc[status] = orders.filter((order) => order.status === status).length;
    return acc;
  }, {});

  const latestFiveOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  // const summaryCards = [
  //   { title: "Shipped Orders", count: "12", className: "shipped-card" },
  //   { title: "Pending Orders", count: "08", className: "shipped-card2" },
  //   { title: "Cancelled Orders", count: "06", className: "shipped-card3" },
  // ];

  const summaryCards = [
    {
      title: "Total Orders",
      count: orders.length,
      className: "bg-primary totalorders-card",
    },
    {
      title: "Pending Orders",
      count: orderStatusCounts["Pending"],
      className: "shipped-card",
    },
    {
      title: "Shipped Orders",
      count: orderStatusCounts["Shipped"],
      className: "shipped-card2",
    },
    {
      title: "Cancelled Orders",
      count: orderStatusCounts["Cancelled"],
      className: "shipped-card3",
    },
  ];

  // 1. TOP SUMMARY CARDS
  // 2. INBOX / NOTIFICATIONS
  // 3. RECENT ORDERS
  const getBadgeClass = (status) => {
    const classes = {
      Shipped: "bg-success",
      Processing: "bg-primary",
      Pending: "bg-warning text-dark",
      Cancelled: "bg-danger",
      Returned: "bg-secondary",
    };
    return classes[status] || "bg-info";
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div
      className="container-fluid py-4 animate-fade-in"
      style={{ backgroundColor: "var(--d-main-bg-color)", minHeight: "100vh" }}
    >
      {/* 1. TOP SUMMARY CARDS */}
      <div className="row g-2 g-lg-3 mb-4">
        {summaryCards.map((item, idx) => (
          <div className="col-6 col-md-3" key={idx}>
            <div
              className={`${item.className} d-flex flex-column justify-content-center px-4 shadow-sm`}
            >
              <h6 className="text-white opacity-75 mb-1">{item.title}</h6>
              <h2 className="text-white fw-bold m-0">{item.count}</h2>
              {/* Optional: subtle background icon could go here */}
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* 2. INBOX / NOTIFICATIONS */}
        <div className="col-xl-4 col-lg-5">
          <div className="dashboard-content bg-white p-4 h-100 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="m-0 text-color">Inbox</h6>
              <span className="d-link-color small cursor-pointer">
                View All
              </span>
            </div>

            {[
              {
                title: "New Order Received",
                time: "2 min ago",
                dot: "green_bg",
              },
              {
                title: "Payment Pending",
                time: "1 hour ago",
                dot: "yellow_bg",
              },
              { title: "Order Cancelled", time: "Yesterday", dot: "red" },
              { title: "New Customer Signup", time: "Today", dot: "green_bg" },
            ].map((item, idx) => (
              <div
                className="d-flex align-items-start gap-3 mb-4 border-bottom pb-3 last-child-border-0"
                key={idx}
              >
                <div
                  className={`${item.dot} mt-1`}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                ></div>
                <div>
                  <p
                    className="fw-bold mb-0 small"
                    style={{ color: "var(--text-color)" }}
                  >
                    {item.title}
                  </p>
                  <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                    {item.time}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. RECENT ORDERS TABLE */}
        <div className="col-xl-8 col-lg-7">
          <div className="dashboard-content bg-white p-0 overflow-hidden shadow-sm h-100">
            <div className="p-4 border-bottom">
              <h6 className="m-0 text-color">Recent Orders</h6>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead style={{ backgroundColor: "#fcfcfd" }}>
                  <tr className="text-muted small uppercase">
                    <th className="ps-4 py-3">Order ID</th>
                    <th>Customer</th>
                    <th className="d-none d-md-table-cell">Date</th>
                    <th>Status</th>
                    <th className="text-end pe-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {latestFiveOrders.map((order, idx) => (
                    <tr key={idx} style={{ cursor: "pointer" }}>
                      <td className="ps-4 fw-bold d-link-color">
                        {order._id.slice(0, 5)}
                      </td>
                      <td>
                        {order.firstName} {order.lastName}
                      </td>
                      <td className="d-none d-md-table-cell text-muted small">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill px-3 ${getBadgeClass(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td
                        className="text-end pe-4 fw-bold"
                        style={{ color: "var(--text-color)" }}
                      >
                        {order.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TREND ANALYSIS CHART */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="dashboard-content bg-white p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h6 className="m-0 text-color">Sales Trend Analysis</h6>
                <small className="text-muted">
                  Monthly performance overview
                </small>
              </div>
              <select className="form-select form-select-sm w-auto border-0 bg-light">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div style={{ minHeight: "300px" }}>
              <TrendChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

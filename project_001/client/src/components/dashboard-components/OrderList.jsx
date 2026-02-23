import React, { useState } from "react";
import { FaThumbtack, FaPrint, FaTrashAlt } from "react-icons/fa";



const OrderList = () => {
  const [orders, setOrders] = useState([
    /* ... your initial data ... */
    {
      id: "#ORD-1001",
      customer: "John Doe",
      status: "Processing",
      amount: "$120",
      date: "12 Jan 2026",
      phone: "01741899095",
      address: "123 Main St, Cityville",
      email: "john@example.com",
      items: [
        { productName: "Product A", size: "M", quantity: 2, totalPrice: "$50" },
        { productName: "Product B", size: "L", quantity: 1, totalPrice: "$70" },
      ],
      pinned: false,
    },
    // Adding a second one for logic demo
    {
      id: "#ORD-1002",
      customer: "Sarah Smith",
      status: "Shipped",
      amount: "$89",
      date: "13 Jan 2026",
      phone: "01741234567",
      address: "456 Park Ave, Townsville",
      email: "sarah@example.com",
      items: [{ productName: "Product C", size: "S", quantity: 1, totalPrice: "$89" }],
      pinned: true,
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Toggle Pin Status
  const togglePin = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, pinned: !o.pinned } : o));
  };

  // Status Update
  const updateStatus = (id, newStatus) => {
    const updated = orders.map((o) => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(updated);
    setSelectedOrder(updated.find((o) => o.id === id));
  };

  // Logic: Pinned items come first, then filtered by Search/Status
  const filteredOrders = orders
    .filter((order) => {
      const matchSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "All" || order.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => b.pinned - a.pinned); // Pinned (true) comes before Unpinned (false)

  const handlePrint = () => {
    window.print();
  };

  const getBadgeClass = (status) => {
    const classes = {
      Shipped: "bg-success",
      Processing: "bg-primary",
      Pending: "bg-warning text-dark",
      Cancelled: "bg-danger",
      Returned: "bg-secondary"
    };
    return classes[status] || "bg-info";
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0">Order Management</h5>
        <button className="btn btn-outline-dark btn-sm" onClick={handlePrint}>
          <FaPrint className="me-2" /> Print Report
        </button>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input
              className="form-control border-start-0"
              placeholder="Search customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="d-none d-md-flex row fw-bold bg-dark text-white p-3 m-0">
          <div className="col-md-1"></div>
          <div className="col-md-2">Order ID</div>
          <div className="col-md-3">Customer</div>
          <div className="col-md-2">Amount</div>
          <div className="col-md-2 text-center">Status</div>
          <div className="col-md-2 text-end">Action</div>
        </div>

        {filteredOrders.map((order) => (
          <div key={order.id} className={`row m-0 p-3 border-bottom align-items-center ${order.pinned ? "bg-light" : "bg-white"}`}>
            {/* Pin Action */}
            <div className="col-12 col-md-1 text-md-center">
              <FaThumbtack 
                onClick={() => togglePin(order.id)}
                style={{ cursor: 'pointer', color: order.pinned ? 'var(--primary-color)' : '#ccc' }}
              />
            </div>
            
            <div className="col-12 col-md-2 fw-bold text-primary">{order.id}</div>
            <div className="col-12 col-md-3">
               <strong>{order.customer}</strong>
               <div className="small text-muted">{order.phone}</div>
            </div>
            <div className="col-12 col-md-2 fw-bold text-success">{order.amount}</div>
            <div className="col-12 col-md-2 text-md-center">
              <span className={`badge ${getBadgeClass(order.status)}`}>{order.status}</span>
            </div>
            <div className="col-12 col-md-2 text-md-end mt-2 mt-md-0">
              <button className="btn btn-dark btn-sm px-3" onClick={() => setSelectedOrder(order)}>
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Details */}
      {selectedOrder && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.7)" }}>
           {/* ... your modal content remains similar, but clean it up ... */}
           <div className="modal-dialog modal-lg modal-dialog-centered shadow-lg">
             <div className="modal-content border-0">
                <div className="modal-header bg-light">
                   <h5 className="modal-title fw-bold">Order Details: {selectedOrder.id}</h5>
                   <button className="btn-close" onClick={() => setSelectedOrder(null)} />
                </div>
                <div className="modal-body p-4">
                   <div className="row mb-4">
                      <div className="col-md-6">
                         <label className="text-muted small text-uppercase fw-bold">Shipping To</label>
                         <p className="fw-bold mb-0">{selectedOrder.customer}</p>
                         <p className="small mb-0 text-muted">{selectedOrder.email} | {selectedOrder.phone}</p>
                         <p className="small text-muted">{selectedOrder.address}</p>
                      </div>
                      <div className="col-md-6 text-md-end">
                         <label className="text-muted small text-uppercase fw-bold">Update Status</label>
                         <div>
                            <select 
                               className="form-select w-auto d-inline-block"
                               value={selectedOrder.status}
                               onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                            >
                               <option>Pending</option>
                               <option>Processing</option>
                               <option>Shipped</option>
                               <option>Cancelled</option>
                               <option>Returned</option>
                            </select>
                         </div>
                      </div>
                   </div>
                   
                   <table className="table table-sm">
                      <thead className="table-light">
                         <tr>
                            <th>Item Name</th>
                            <th>Size</th>
                            <th className="text-center">Qty</th>
                            <th className="text-end">Total</th>
                         </tr>
                      </thead>
                      <tbody>
                         {selectedOrder.items.map((item, i) => (
                            <tr key={i}>
                               <td>{item.productName}</td>
                               <td>{item.size}</td>
                               <td className="text-center">{item.quantity}</td>
                               <td className="text-end fw-bold">{item.totalPrice}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                   <div className="text-end mt-3 h5 fw-bold text-success">
                      Grand Total: {selectedOrder.amount}
                   </div>
                </div>
                <div className="modal-footer border-0">
                   <button className="btn btn-secondary px-4" onClick={() => setSelectedOrder(null)}>Close</button>
                   <button className="btn btn-primary px-4" onClick={handlePrint}>Print Invoice</button>
                </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;


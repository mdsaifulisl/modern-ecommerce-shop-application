import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrintInvoice = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  useEffect(() => {
    if (!order) {
      navigate(-1);
      return;
    }

    setTimeout(() => {
      window.print();
    }, 300);
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="thermal-print">
      <h3 className="text-center mb-2">INVOICE</h3>
      <p className="text-center small mb-3">
        Order #{order._id?.slice(-5)}
      </p>

      <hr />

      <p className="small mb-1">
        <b>Date:</b> {new Date(order.createdAt).toLocaleString()}
      </p>
      <p className="small mb-1">
        <b>Name:</b> {order.firstName} {order.lastName}
      </p>
      <p className="small mb-1">
        <b>Phone:</b> {order.phone}
      </p>
      <p className="small mb-2">
        <b>Address:</b> {order.address}
      </p>

      <hr />

      <table className="w-100 small">
        <thead>
          <tr>
            <th align="left">Item</th>
            <th align="center">Qty</th>
            <th align="right">Price</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((item, i) => (
            <tr key={i}>
              <td>{item.productName}</td>
              <td align="center">{item.quantity}</td>
              <td align="right">৳{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <p className="text-end fw-bold">
        Total: ৳{order.total}
      </p>

      <p className="text-center small mt-3">
        Thank you for your purchase
      </p>
    </div>
  );
};

export default PrintInvoice;



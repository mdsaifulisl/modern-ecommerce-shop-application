import React, { createContext, useContext, useState } from "react";
import api from "../api/axios";
import { useCart } from "./CartContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { clearCart } = useCart();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  // ✅ Verify order (used only in OrderSuccess page)
  const verifyOrder = async (orderId) => {
    try {
      const response = await api.get(`/orders/verify/${orderId}`);
      return { success: true, order: response.data.order };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Invalid order",
      };
    }
  };

  // ✅ Place order
  const placeOrder = async (orderData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/orders", orderData);

      if (response.data.success) {
        setLastOrder(response.data.orderId);
        clearCart();
        return { success: true, orderId: response.data.orderId };
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Order placement failed";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch all orders (Admin / Order history)
  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status } : o
        )
      );
      return { success: true };
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return { success: false };
    }
  };

  return (
    <OrderContext.Provider
      value={{
        placeOrder,
        fetchAllOrders,
        updateOrderStatus,
        verifyOrder,
        orders,
        loading,
        error,
        lastOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => useContext(OrderContext);

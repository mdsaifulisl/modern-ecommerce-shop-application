import React, { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios"; // Your axios instance

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Submit Contact Form (Used in Contact.jsx)
  const sendMessage = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post("/contacts", formData);
      // If successful, we could manually add it to the state if the admin is viewing
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to send message";
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch All Messages (Used in Inbox.jsx)
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/contacts");
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load inbox.");
    } finally {
      setLoading(false);
    }
  }, []);


  // 4. Mark Message as Read
// ...existing code...
const markAsRead = async (id) => {
  try {
    const res = await api.patch(`/contacts/read/${id}`);
    if (res?.status !== 200) return { success: false };
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === id ? { ...msg, status: "seen" } : msg
      )
    );
    return { success: true };
  } catch (err) {
    console.error("Failed to mark as read", err);
    return { success: false };
  }
};
// ...existing code...


  // 3. Delete Message (Optional but recommended for Inbox)
  const deleteMessage = async (id) => {
    try {
      console.log("Deleting message with ID:", id);
      await api.delete(`/contacts/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      return { success: true };
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return { success: false, message: "Delete failed" };
    }
  };

  return (
    <ContactContext.Provider
      value={{
        messages,
        loading,
        error,
        sendMessage,
        fetchMessages,
        deleteMessage,
        markAsRead
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};
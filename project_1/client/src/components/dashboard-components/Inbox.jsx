import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

// context
import { useContacts } from "../../context/ContactContext";

const Inbox = () => {
  const { messages, deleteMessage, fetchMessages, markAsRead } = useContacts();
  const [selectedMessage, setSelectedMessage] = useState(null);
  console.log("messages", messages);
  const openDetails = async (msg) => {
    setSelectedMessage(msg);
    await markAsRead(msg.id);
    await fetchMessages();
  };

  const heandelDelete = async (msg) => {
    await deleteMessage(msg.id);
    await fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="container-fluid py-4">
      <h4 className="fw-bold mb-4">Inbox</h4>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th className="d-none d-md-table-cell">Subject</th>
                <th className="d-none d-md-table-cell">Date</th>
                <th>Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {messages.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No messages found
                  </td>
                </tr>
              )}

              {messages.map((msg) => (
                <tr key={msg._id}>
                  {/* Name column */}
                  <td>
                    <div className="fw-semibold">{msg.name}</div>
                    <small className="text-muted d-block d-none d-md-table-cell">
                      {msg.number} {/* show email on mobile */}
                    </small>
                  </td>

                  {/* Subject column */}
                  <td
                    className={`d-none d-md-table-cell ${msg.status === "unread" ? "fw-bold" : ""}`}
                  >
                    {msg.subject}
                  </td>

                  {/* Date column */}
                  <td className="d-none d-md-table-cell">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>

                  {/* Status column */}
                  <td>
                    <span
                      className={`badge ${msg.status === "unread" ? "bg-warning text-dark" : "bg-success"}`}
                    >
                      {msg.status}
                    </span>
                  </td>

                  {/* Action column */}
                  <td className="text-end d-flex gap-2 justify-content-end">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#messageModal"
                      onClick={() => openDetails(msg)}
                    >
                      <IoEyeSharp />
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => heandelDelete(msg)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------- Message Details Modal -------- */}
      <div
        className="modal fade"
        id="messageModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">Message Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {selectedMessage && (
              <div className="modal-body">
                <p>
                  <strong>date:</strong> {selectedMessage.createdAt.slice(0, 10)}
                </p>
                <p>
                  <strong>Name:</strong> {selectedMessage.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedMessage.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedMessage.number}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedMessage.subject}
                </p>
                <p>
                  <strong>Message:</strong>
                </p>
                <div className="bg-light p-3 rounded">
                  {selectedMessage.message}
                </div>
              </div>
            )}

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;

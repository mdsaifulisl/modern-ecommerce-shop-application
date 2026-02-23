import React, { useState } from "react";
import { FaUser, FaStore, FaPalette, FaLock, FaSave } from "react-icons/fa";

const Settings = () => {
  const [activeSubTab, setActiveSubTab] = useState("profile");

  return (
    <div className="card border-0 shadow-sm overflow-hidden">
      <div className="row g-0">
        {/* Settings Navigation */}
        <div className="col-md-3 border-end bg-light">
          <div className="list-group list-group-flush">
            <button
              onClick={() => setActiveSubTab("profile")}
              className={`list-group-item list-group-item-action py-3 d-flex align-items-center gap-3 border-0 ${activeSubTab === "profile" ? "active" : "bg-transparent"}`}
            >
              <FaUser /> Account Profile
            </button>
            <button
              onClick={() => setActiveSubTab("store")}
              className={`list-group-item list-group-item-action py-3 d-flex align-items-center gap-3 border-0 ${activeSubTab === "store" ? "active" : "bg-transparent"}`}
            >
              <FaStore /> Store Configuration
            </button>
            <button
              onClick={() => setActiveSubTab("appearance")}
              className={`list-group-item list-group-item-action py-3 d-flex align-items-center gap-3 border-0 ${activeSubTab === "appearance" ? "active" : "bg-transparent"}`}
            >
              <FaPalette /> Appearance
            </button>
            <button
              onClick={() => setActiveSubTab("security")}
              className={`list-group-item list-group-item-action py-3 d-flex align-items-center gap-3 border-0 ${activeSubTab === "security" ? "active" : "bg-transparent"}`}
            >
              <FaLock /> Security
            </button>
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="col-md-9 bg-white">
          <div className="p-4 p-md-5">
            {activeSubTab === "profile" && <ProfileForm />}
            {activeSubTab === "store" && <StoreForm />}
            {activeSubTab === "appearance" && <AppearanceForm />}
            {activeSubTab === "security" && <SecurityForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Sub-Forms --- */

const ProfileForm = () => (
  <form>
    <h5 className="mb-4 fw-bold">Admin Profile</h5>
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label small fw-bold text-muted">Full Name</label>
        <input type="text" className="form-control" defaultValue="Admin User" />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold text-muted">Email Address</label>
        <input type="email" className="form-control" defaultValue="admin@store.com" />
      </div>
      <div className="col-12 text-end mt-4">
        <button className="btn btn-primary px-4 d-inline-flex align-items-center gap-2">
          <FaSave /> Save Changes
        </button>
      </div>
    </div>
  </form>
);

const StoreForm = () => (
  <form>
    <h5 className="mb-4 fw-bold">Store Settings</h5>
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label small fw-bold text-muted">Store Name</label>
        <input type="text" className="form-control" defaultValue="My Premium Store" />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold text-muted">Currency</label>
        <select className="form-select">
          <option>USD ($)</option>
          <option>EUR (€)</option>
          <option>GBP (£)</option>
        </select>
      </div>
      <div className="col-12 text-end mt-4">
        <button className="btn btn-primary px-4">Update Store</button>
      </div>
    </div>
  </form>
);

const AppearanceForm = () => (
  <div>
    <h5 className="mb-4 fw-bold">Appearance</h5>
    <div className="mb-4">
      <label className="form-label small fw-bold text-muted">Dashboard Theme</label>
      <div className="d-flex gap-3">
        <div className="p-4 border rounded cursor-pointer border-primary bg-light">Light Mode</div>
        <div className="p-4 border rounded cursor-pointer bg-dark text-white">Dark Mode</div>
      </div>
    </div>
  </div>
);

const SecurityForm = () => (
  <form>
    <h5 className="mb-4 fw-bold">Password & Security</h5>
    <div className="mb-3">
      <label className="form-label small fw-bold text-muted">New Password</label>
      <input type="password" className="form-control" />
    </div>
    <div className="mb-3">
      <label className="form-label small fw-bold text-muted">Confirm Password</label>
      <input type="password" className="form-control" />
    </div>
    <button className="btn btn-danger mt-2">Update Credentials</button>
  </form>
);

export default Settings;
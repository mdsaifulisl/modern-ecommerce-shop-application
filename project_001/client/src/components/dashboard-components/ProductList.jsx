import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaBoxOpen } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("inventory_data");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Premium Cotton Tee",
            category: "Apparel",
            price: "25",
            stock: 15,
            description: "High-quality cotton t-shirt with a modern fit.",
            sizes: ["S", "M", "L"],
            image:
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("inventory_data", JSON.stringify(products));
  }, [products]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [modalMode, setModalMode] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Apparel",
    price: "",
    stock: 0,
    description: "",
    sizes: [],
    image: "https://via.placeholder.com/150",
  });

  const categories = ["Apparel", "Accessories", "Electronics", "Footwear"];
  const allAvailableSizes = ["S", "M", "L", "XL", "XXL", "One Size"];

  // --- NEW LOGIC: Form Validation ---
  const isFormInvalid =
    !formData.name.trim() || !formData.price || formData.sizes.length === 0;

  const openModal = (mode, product = null) => {
    setModalMode(mode);
    if (mode === "edit" && product) {
      setFormData({ ...product });
    } else {
      setFormData({
        name: "",
        category: "Apparel",
        price: "",
        stock: 0,
        description: "",
        sizes: [],
        image: "https://via.placeholder.com/150",
      });
    }
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormInvalid) return; // Guard clause
    if (modalMode === "add") {
      setProducts([...products, { ...formData, id: Date.now() }]);
    } else {
      setProducts(products.map((p) => (p.id === formData.id ? formData : p)));
    }
    setModalMode(null);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="container-fluid py-4 animate-fade-in"
      style={{ backgroundColor: "var(--d-main-bg-color)", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="m-0 text-color">Inventory Management</h5>
        <button
          className="btn d-flex align-items-center gap-2 text-white shadow-sm"
          style={{
            backgroundColor: "var(--green-color)",
            borderRadius: "10px",
          }}
          onClick={() => openModal("add")}
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <div className="input-group dashboard-card shadow-sm border-0">
            <span className="input-group-text bg-white border-0 ps-3">
              <FaSearch className="d-link-color" />
            </span>
            <input
              type="text"
              className="form-control border-0 py-2"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-select border-0 shadow-sm py-2"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-content bg-white overflow-hidden shadow-sm">
  <div className="table-responsive">
    <table className="table table-hover align-middle mb-0">
      <thead style={{ backgroundColor: "#fcfcfd" }}>
        <tr className="text-muted small uppercase">
          <th className="ps-4 py-3">Product</th>
          {/* Hidden on mobile, shown on medium screens + */}
          <th className="d-none d-md-table-cell">Category</th>
          <th className="text-center">Stock</th>
          <th className="d-none d-sm-table-cell">Price</th>
          <th className="text-end pe-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => (
          <tr key={product.id} className="animate-fade-in">
            <td className="ps-4 py-3">
              <div className="d-flex align-items-center gap-2 gap-md-3">
                <img
                  src={product.image}
                  className="rounded-3 border"
                  width="40"
                  height="40"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
                <div className="text-truncate" style={{ maxWidth: "120px" }}>
                  <p
                    className="fw-bold m-0 small mb-md-1"
                    style={{ color: "var(--text-color)", lineHeight: "1.2" }}
                  >
                    {product.name}
                  </p>
                  {/* Sizes only show on larger screens to save vertical space on mobile */}
                  <span className="d-link-color smaller d-none d-md-block">
                    {product.sizes.join(", ")}
                  </span>
                </div>
              </div>
            </td>
            
            {/* Category: Hidden on mobile */}
            <td className="d-none d-md-table-cell">
              <span
                className="badge rounded-pill px-3"
                style={{
                  background: "var(--d-main-bg-color)",
                  color: "var(--text-color)",
                }}
              >
                {product.category}
              </span>
            </td>

            <td className="text-center">
              <span
                className={`fw-bold small ${product.stock < 5 ? "red-text" : "green"}`}
                style={{
                  color: product.stock < 5 ? "var(--red-color)" : "",
                  fontSize: "0.85rem"
                }}
              >
                {product.stock} <span className="d-none d-md-inline">in stock</span>
              </span>
            </td>

            {/* Price: Hidden on extra small phones */}
            <td className="fw-bold text-color d-none d-sm-table-cell">
              ${product.price}
            </td>

            <td className="text-end pe-4">
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-sm p-1 p-md-2 me-1 border-0"
                  onClick={() => openModal("edit", product)}
                >
                  <FaEdit className="d-link-color" />
                </button>
                <button
                  className="btn btn-sm p-1 p-md-2 border-0"
                  onClick={() => {
                    if (window.confirm("Delete this product?"))
                      setProducts(products.filter((p) => p.id !== product.id));
                  }}
                >
                  <FaTrash style={{ color: "var(--red-color)" }} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      {/* Modal */}
      {modalMode && (
        <div
          className="modal d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <form
              className="modal-content border-0 shadow-lg"
              style={{ borderRadius: "15px" }}
              onSubmit={handleSubmit}
            >
              <div className="modal-header border-0 pt-4 px-4">
                <h5 className="modal-title">
                  {modalMode === "add" ? "New Product" : "Edit Product"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalMode(null)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div
                      className="preview-box border rounded-3 mb-3 overflow-hidden shadow-sm"
                      style={{ height: "200px" }}
                    >
                      <img
                        src={formData.image}
                        className="w-100 h-100 object-fit-cover"
                        alt="Preview"
                      />
                    </div>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () =>
                          setFormData((prev) => ({
                            ...prev,
                            image: reader.result,
                          }));
                        if (file) reader.readAsDataURL(file);
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="small fw-bold mb-1">Title</label>
                        <input
                          type="text"
                          className="form-control border-0 shadow-sm"
                          style={{ background: "var(--d-main-bg-color)" }}
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small fw-bold mb-1">Category</label>
                        <select
                          className="form-select border-0 shadow-sm"
                          style={{ background: "var(--d-main-bg-color)" }}
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                        >
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="small fw-bold mb-1">Price</label>
                        <input
                          type="number"
                          className="form-control border-0 shadow-sm"
                          style={{ background: "var(--d-main-bg-color)" }}
                          required
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="small fw-bold mb-1">Stock</label>
                        <input
                          type="number"
                          className="form-control border-0 shadow-sm"
                          style={{ background: "var(--d-main-bg-color)" }}
                          required
                          value={formData.stock}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              stock: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="col-12">
                        <label className="small fw-bold mb-2 d-block">
                          Available Sizes
                        </label>
                        <div className="d-flex flex-wrap gap-2">
                          {allAvailableSizes.map((s) => (
                            <button
                              type="button"
                              key={s}
                              className={`btn btn-sm rounded-pill fw-bold transition-all px-3 ${formData.sizes.includes(s) ? "green_bg text-white" : "btn-outline-secondary"}`}
                              onClick={() => handleSizeToggle(s)}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        {formData.sizes.length === 0 && (
                          <span className="text-danger small mt-1 d-block">
                            Please select at least one size.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 p-4">
                <button
                  type="button"
                  className="btn d-link-color border-0"
                  onClick={() => setModalMode(null)}
                >
                  Discard
                </button>

                {/* MODIFIED BUTTON: Added disabled property and dynamic styling */}
                <button
                  type="submit"
                  disabled={isFormInvalid}
                  className="upload-btn px-5 shadow-sm"
                  style={{
                    borderRadius: "10px",
                    opacity: isFormInvalid ? 0.5 : 1,
                    cursor: isFormInvalid ? "not-allowed" : "pointer",
                    backgroundColor: isFormInvalid
                      ? "#ccc"
                      : "var(--green-color)",
                  }}
                >
                  {modalMode === "add" ? "Create Product" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

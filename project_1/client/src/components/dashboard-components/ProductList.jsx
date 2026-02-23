import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { useProducts } from "../../context/ProductContext";

const ProductList = () => {
  const { products, addProduct, updateProduct, deleteProduct, loading, refreshProducts } = useProducts();
 
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [modalMode, setModalMode] = useState(null);

  const allAvailableSizes = ["S-32", "M-36", "L-40", "XL-44", "XXL-48", "One Size"];

  const [formData, setFormData] = useState({
    _id: null,
    productName: "",
    category: "",
    price: "",
    discount_price: "",
    stock: 0,
    description: "",
    sizes: [],
    image: null,
    preview: "",
  });

  const isFormInvalid = !formData.productName.trim() || !formData.price || formData.sizes.length === 0;

  const openModal = (mode, product = null) => {
    setModalMode(mode);
    if (mode === "edit" && product) {
      setFormData({
        ...product,
        preview: product.image,
        image: null,
      });
    } else {
      setFormData({
        _id: null,
        productName: "",
        category: "",
        price: "",
        discount_price: "",
        stock: 0,
        description: "",
        sizes: [],
        image: null,
        preview: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormInvalid) return;

    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("discount_price", formData.discount_price || 0);
    data.append("stock", formData.stock);
    data.append("description", formData.description);
    data.append("sizes", JSON.stringify(formData.sizes));
    if (formData.image) data.append("image", formData.image);

    if (modalMode === "add") {
      await addProduct(data);
    } else {
      await updateProduct(formData._id, data);
    }

    await refreshProducts(); // Fetch latest products from backend
    setModalMode(null);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.productName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="container-fluid py-4 animate-fade-in" style={{ backgroundColor: "var(--d-main-bg-color)", minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="m-0 text-color">Inventory Management</h5>
        <button
          className="btn d-flex align-items-center gap-2 text-white shadow-sm"
          style={{ backgroundColor: "var(--green-color)", borderRadius: "10px" }}
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
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="dashboard-content bg-white overflow-hidden shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "#fcfcfd" }}>
              <tr className="text-muted small uppercase">
                <th className="ps-4 py-3">Product</th>
                <th className="d-none d-md-table-cell">Category</th>
                <th className="text-center">Stock</th>
                <th className="d-none d-sm-table-cell">Price</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="text-center py-5">Loading Inventory...</td></tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="animate-fade-in">
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center gap-2 gap-md-3">
                        <img
                          src={`${product.image}`}
                          className="rounded-3 border"
                          width="40" height="40"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                        <div className="text-truncate" style={{ maxWidth: "150px" }}>
                          <p className="fw-bold m-0 small mb-md-1" style={{ color: "var(--text-color)", lineHeight: "1.2" }}>
                            {product.productName}
                          </p>
                          <span className="text-muted smaller d-block text-truncate">
                            {product.description || "No description"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="d-none d-md-table-cell">
                      <span className="badge rounded-pill px-3" style={{ background: "var(--d-main-bg-color)", color: "var(--text-color)" }}>
                        {product.category}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={`fw-bold small`} style={{ color: product.stock < 5 ? "var(--red-color)" : "var(--green-color)", fontSize: "0.85rem" }}>
                        {product.stock} <span className="d-none d-md-inline">in stock</span>
                      </span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {product.discount_price > 0 ? (
                        <div>
                          <span className="fw-bold text-color">৳{product.discount_price}</span>
                          <br />
                          <small className="text-muted text-decoration-line-through">৳{product.price}</small>
                        </div>
                      ) : (
                        <span className="fw-bold text-color">৳{product.price}</span>
                      )}
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-sm p-1 p-md-2 me-1 border-0" onClick={() => openModal("edit", product)}>
                          <FaEdit className="d-link-color" />
                        </button>
                        <button className="btn btn-sm p-1 p-md-2 border-0" onClick={() => { if (window.confirm("Delete this product?")) { deleteProduct(product._id); refreshProducts(); } }}>
                          <FaTrash style={{ color: "var(--red-color)" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalMode && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <form className="modal-content border-0 shadow-lg" style={{ borderRadius: "15px" }} onSubmit={handleSubmit}>
              <div className="modal-header border-0 pt-4 px-4">
                <h5 className="modal-title">{modalMode === "add" ? "New Product" : "Edit Product"}</h5>
                <button type="button" className="btn-close" onClick={() => setModalMode(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="preview-box border rounded-3 mb-3 overflow-hidden shadow-sm" style={{ height: "200px" }}>
                      {formData.preview ? (
                        <img src={formData.preview} className="w-100 h-100 object-fit-cover" alt="Preview" />
                      ) : (
                        <div className="h-100 d-flex align-items-center justify-content-center bg-light text-muted small">No Image Selected</div>
                      )}
                    </div>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setFormData({ ...formData, image: file, preview: URL.createObjectURL(file) });
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="small fw-bold mb-1">Product Title</label>
                        <input type="text" className="form-control border-0 shadow-sm" style={{ background: "var(--d-main-bg-color)" }} required value={formData.productName} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} />
                      </div>
                      <div className="col-md-6">
                        <label className="small fw-bold mb-1">Category</label>
                        <input type="text" className="form-control border-0 shadow-sm" style={{ background: "var(--d-main-bg-color)" }} required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                      </div>
                      <div className="col-md-3">
                        <label className="small fw-bold mb-1 text-danger">Price (Old)</label>
                        <input type="number" className="form-control border-0 shadow-sm" style={{ background: "var(--d-main-bg-color)" }} required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                      </div>
                      <div className="col-md-3">
                        <label className="small fw-bold mb-1 text-success">Discount Price</label>
                        <input type="number" className="form-control border-0 shadow-sm" style={{ background: "var(--d-main-bg-color)" }} placeholder="0" value={formData.discount_price} onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })} />
                      </div>
                      <div className="col-12">
                        <label className="small fw-bold mb-1">Description</label>
                        <textarea className="form-control border-0 shadow-sm" style={{ background: "var(--d-main-bg-color)", minHeight: "80px" }} placeholder="Short product details..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                      </div>
                      <div className="col-md-4">
                        <label className="small fw-bold mb-1">Stock Quantity</label>
                        <input type="number" className="form-control border-0 shadow-sm" style={{ background: "var(--d-main-bg-color)" }} required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })} />
                      </div>
                      <div className="col-12">
                        <label className="small fw-bold mb-2 d-block">Available Sizes</label>
                        <div className="d-flex flex-wrap gap-2">
                          {allAvailableSizes.map((s) => (
                            <button type="button" key={s} className={`btn btn-sm rounded-pill fw-bold transition-all px-3 ${formData.sizes.includes(s) ? "green_bg text-white" : "btn-outline-secondary"}`} onClick={() => handleSizeToggle(s)}>{s}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 p-4">
                <button type="button" className="btn d-link-color border-0" onClick={() => setModalMode(null)}>Discard</button>
                <button type="submit" disabled={isFormInvalid} className="upload-btn px-5 shadow-sm" style={{ borderRadius: "10px", opacity: isFormInvalid ? 0.5 : 1, cursor: isFormInvalid ? "not-allowed" : "pointer", backgroundColor: isFormInvalid ? "#ccc" : "var(--green-color)" }}>
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

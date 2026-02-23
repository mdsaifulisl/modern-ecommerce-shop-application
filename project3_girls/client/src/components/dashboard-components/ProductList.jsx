import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { useProducts } from "../../context/ProductContext";

const ProductList = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    loading,
    refreshProducts,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [modalMode, setModalMode] = useState(null);

  const [formData, setFormData] = useState({
    _id: null,
    productName: "",
    category: "",
    price: "",
    discount_price: "",
    stock: 0,
    description: "",
    images: [],
    previews: [],
  });

  // ✅ No size validation
  const isFormInvalid = !formData.productName.trim() || !formData.price;

  /* =====================
      Open Modal
  ===================== */
  const openModal = (mode, product = null) => {
    setModalMode(mode);

    if (mode === "edit" && product) {
      setFormData({
        _id: product._id,
        productName: product.productName || "",
        category: product.category || "",
        price: product.price || "",
        discount_price: product.discount_price || "",
        stock: product.stock || 0,
        description: product.description || "",

        // old images preview
        images: [],
        previews: product.images || [],
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
        images: [],
        previews: [],
      });
    }
  };

  /* =====================
      Submit Form
  ===================== */
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

    // send empty sizes
    data.append("sizes", JSON.stringify([]));

    // new images
    if (formData.images.length > 0) {
      formData.images.forEach((img) => {
        data.append("images", img);
      });
    }

    if (modalMode === "add") {
      await addProduct(data);
    } else {
      await updateProduct(formData._id, data);
    }

    await refreshProducts();
    setModalMode(null);
  };

  /* =====================
      Filter
  ===================== */
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.productName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || p.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = ["All", ...new Set(products.map((p) => p.category))];

  /* =====================
      Cleanup preview urls
  ===================== */
  useEffect(() => {
    return () => {
      if (formData.previews?.length) {
        formData.previews.forEach((url) => {
          if (url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
        });
      }
    };
  }, [formData.previews]);

  /* =====================
      JSX
  ===================== */
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
            {uniqueCategories.map((cat) => (
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
                <th className="d-none d-md-table-cell">Category</th>
                <th className="text-center">Stock</th>
                <th className="d-none d-sm-table-cell">Price</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    Loading Inventory...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="animate-fade-in">
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center gap-2 gap-md-3">
                        <img
                          src={
                            product.images?.[0] ||
                            product.image ||
                            "https://via.placeholder.com/40"
                          }
                          className="rounded-3 border"
                          width="40"
                          height="40"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />

                        <div
                          className="text-truncate"
                          style={{ maxWidth: "150px" }}
                        >
                          <p
                            className="fw-bold m-0 small mb-md-1"
                            style={{
                              color: "var(--text-color)",
                              lineHeight: "1.2",
                            }}
                          >
                            {product.productName}
                          </p>
                          <span className="text-muted smaller d-block text-truncate">
                            {product.description || "No description"}
                          </span>
                        </div>
                      </div>
                    </td>
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
                        className="fw-bold small"
                        style={{
                          color:
                            product.stock < 5
                              ? "var(--red-color)"
                              : "var(--green-color)",
                          fontSize: "0.85rem",
                        }}
                      >
                        {product.stock}{" "}
                        <span className="d-none d-md-inline">in stock</span>
                      </span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                      {product.discount_price > 0 ? (
                        <div>
                          <span className="fw-bold text-color">
                            ৳{product.discount_price}
                          </span>
                          <br />
                          <small className="text-muted text-decoration-line-through">
                            ৳{product.price}
                          </small>
                        </div>
                      ) : (
                        <span className="fw-bold text-color">
                          ৳{product.price}
                        </span>
                      )}
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
                          className="btn btn-sm p-1 p-md-2 border-0 text-white"
                          onClick={() => {
                            if (window.confirm("Delete this product?")) {
                              deleteProduct(product._id);
                              refreshProducts();
                            }
                          }}
                        >
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

      {/* Modal */}
      {modalMode && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <form
              className="modal-content border-0 shadow-lg"
              style={{ borderRadius: 15 }}
              onSubmit={handleSubmit}
            >
              {/* Header */}
              <div className="modal-header border-0 pt-4 px-4">
                <h5>{modalMode === "add" ? "New Product" : "Edit Product"}</h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalMode(null)}
                />
              </div>

              {/* Body */}
              <div className="modal-body p-4">
                <div className="row g-4">
                  {/* Images */}
                  <div className="col-md-4">
                    <div
                      className="border rounded p-2 mb-3"
                      style={{ height: 200, overflowY: "auto" }}
                    >
                      {formData.previews.length ? (
                        <div className="d-flex flex-wrap gap-2">
                          {formData.previews.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              width="80"
                              height="80"
                              className="rounded border"
                              style={{ objectFit: "cover" }}
                              alt=""
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                          No Image
                        </div>
                      )}
                    </div>

                    <input
                      type="file"
                      multiple
                      className="form-control form-control-sm"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);

                        const previews = files.map((f) =>
                          URL.createObjectURL(f),
                        );

                        setFormData({
                          ...formData,
                          images: files,
                          previews,
                        });
                      }}
                    />
                  </div>

                  {/* Form */}
                  <div className="col-md-8">
                    <div className="row g-3">
                      <div className="col-12">
                        <input
                          placeholder="Product Name"
                          className="form-control"
                          value={formData.productName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              productName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          placeholder="Category"
                          className="form-control"
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-3">
                        <input
                          type="number"
                          placeholder="Price"
                          className="form-control"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-3">
                        <input
                          type="number"
                          placeholder="Discount"
                          className="form-control"
                          value={formData.discount_price}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              discount_price: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-12">
                        <textarea
                          placeholder="Description"
                          className="form-control"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-4">
                        <input
                          type="number"
                          placeholder="Stock"
                          className="form-control"
                          value={formData.stock}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              stock: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer border-0 p-4">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setModalMode(null)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isFormInvalid}
                  className="btn text-white"
                  style={{
                    background: "var(--green-color)",
                    opacity: isFormInvalid ? 0.5 : 1,
                  }}
                >
                  {modalMode === "add" ? "Create" : "Update"}
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

// এবার ডিজাইন করবো শারী বা জুয়েলাস এর জন্য এখানে কোন সাইজ থাকবে না ফিক্স করুন

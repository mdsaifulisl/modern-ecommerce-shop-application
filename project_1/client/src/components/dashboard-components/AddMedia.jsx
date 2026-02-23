import { useState, useEffect, useMemo } from "react";
import {
  FaCloudUploadAlt,
  FaTimes,
  FaTrash,
  FaEdit,
  FaSave,
  FaSearch,
  FaImages,
  FaSlidersH,
} from "react-icons/fa";
import { useMedia } from "../../context/MediaContext";

const AddMedia = () => {
  const { media, loading, fetchMedia, addMedia, deleteMedia, updateMedia } =
    useMedia();

  // Form State
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState("slider");
  const [title, setTitle] = useState("");

  // UI State
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [message, setMessage] = useState(null); 

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);


const filteredMedia = useMemo(() => {
  return media.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab;

    const itemTitle = item.title || ""; 
    const matchesSearch = itemTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
}, [media, activeTab, searchTerm]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const clearForm = () => {
    setFile(null);
    setPreview(null);
    setTitle("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title)
      return alert("Please provide both an image and a title");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("type", mediaType);

    const result = await addMedia(formData);
    if (result.success) {
      clearForm();
      setMessage(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      // Call the context function
      const result = await deleteMedia(id);

      if (result.success) {
        // 'result.message' now contains "Media deleted successfully" from your backend
        setMessage(result.message);
      } else {
        alert("Error: " + result.message);
      }

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const saveEdit = async (id) => {
    const result = await updateMedia(id, { title: editTitle });
    if (result.success) setEditingId(null);
  };
  if (loading)
    return <div className="text-center fs-3 fw-bold">Loading...</div>;


  return (
    <div className="container-fluid mt-4 mb-5">


      { message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      

      <div className="row g-4">
        {/* LEFT: UPLOAD FORM */}
        <div className="col-lg-4">
          <div
            className="card shadow-sm border-0 p-4 sticky-top"
            style={{ top: "20px" }}
          >
            <h5 className="fw-bold mb-3">Upload Media</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">
                  Type
                </label>
                <select
                  className="form-select shadow-sm"
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                >
                  <option value="slider">Home Slider</option>
                  <option value="gallery">Product Gallery</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">
                  Title / Alt Text
                </label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer Collection"
                />
              </div>

              <div className="mb-4">
                {!preview ? (
                  <label
                    className="border border-2 border-dashed rounded d-flex flex-column align-items-center justify-content-center p-4 bg-light cursor-pointer"
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                    />
                    <FaCloudUploadAlt size={35} className="text-primary mb-2" />
                    <span className="small fw-bold">Select Image</span>
                  </label>
                ) : (
                  <div className="position-relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="img-fluid rounded border"
                      style={{
                        maxHeight: "180px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
                      onClick={clearForm}
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>

              <button
                className="btn btn-primary w-100 fw-bold py-2 shadow-sm"
                type="submit"
                disabled={loading}
              >
                {loading ? "Processing..." : "Upload to Website"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: MEDIA MANAGEMENT */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 p-0 overflow-hidden">
            <div className="p-4 bg-white border-bottom">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <h5 className="fw-bold mb-0">Library Management</h5>
                <div
                  className="position-relative"
                  style={{ maxWidth: "250px" }}
                >
                  <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                  <input
                    type="text"
                    className="form-control form-control-sm ps-5 rounded-pill shadow-sm"
                    placeholder="Search titles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* TABS */}
              <div className="nav nav-pills mt-4 gap-2">
                {["all", "slider", "gallery"].map((tab) => (
                  <button
                    key={tab}
                    className={`nav-link btn-sm px-4 rounded-pill fw-bold text-capitalize ${activeTab === tab ? "active bg-primary" : "bg-light text-muted border"}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "slider" ? (
                      <FaSlidersH className="me-2" />
                    ) : tab === "gallery" ? (
                      <FaImages className="me-2" />
                    ) : null}
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr className="small text-muted text-uppercase">
                    <th className="ps-4">Item</th>
                    <th>Details</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map((item) => (
                    <tr key={item._id}>
                      <td className="ps-4" style={{ width: "100px" }}>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="rounded border shadow-sm"
                          style={{
                            width: "70px",
                            height: "45px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>
                        {editingId === item._id ? (
                          <div className="input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <button
                              className="btn btn-success"
                              onClick={() => saveEdit(item._id)}
                            >
                              <FaSave />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="fw-bold text-dark">
                              {item.title}
                            </div>
                            <span className="text-muted extra-small d-block">
                              Uploaded:{" "}
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </td>
                      <td className="text-end pe-4 d-flex gap-2 align-items-center justify-content-end flex-wrap">
                        <button
                          className="btn btn-outline-primary btn-sm border-0"
                          onClick={() => {
                            setEditingId(item._id);
                            setEditTitle(item.title);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm border-0 text-denger-bg"
                          onClick={() => handleDelete(item._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredMedia.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-5 text-muted small"
                      >
                        No results found for "{searchTerm}" in {activeTab}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedia;

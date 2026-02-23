import { useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

const AddMedia = () => {
  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState("slider");
  const [title, setTitle] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearSelection = () => {
    setPreview(null);
    setTitle("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!preview) {
      alert("Please upload an image");
      return;
    }

    const payload = {
      title,
      type: mediaType,
      imageUrl: preview,
    };

    console.log("Saving to Database:", payload);
    alert(`${mediaType === 'slider' ? 'Slider' : 'Gallery image'} added successfully!`);
    clearSelection();
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h5 className="fw-bold mb-4">Add Content to Website</h5>

        <form onSubmit={handleSubmit}>
          {/* Select Type */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Upload Destination</label>
            <select 
              className="form-select" 
              value={mediaType} 
              onChange={(e) => setMediaType(e.target.value)}
            >
              <option value="slider">Main Home Slider</option>
              <option value="gallery">Product Gallery</option>
            </select>
            <small className="text-muted">
              {mediaType === 'slider' 
                ? "Recommended size: 1920x800px" 
                : "Recommended size: 800x800px"}
            </small>
          </div>

          {/* Title Input */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Image Title / Alt Text</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Summer Collection 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Upload Area */}
          <div className="upload-section mb-4">
            {!preview ? (
              <label className="border border-2 border-dashed rounded d-flex flex-column align-items-center justify-content-center p-5 bg-light cursor-pointer" style={{ cursor: 'pointer' }}>
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                <FaCloudUploadAlt size={50} className="text-primary mb-2" />
                <span className="fw-bold">Click to Upload Image</span>
                <span className="small text-muted">PNG, JPG or WebP</span>
              </label>
            ) : (
              <div className="position-relative text-center">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="img-fluid rounded shadow-sm border" 
                  style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }} 
                />
                <button 
                  type="button" 
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
                  onClick={clearSelection}
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          <button className="btn btn-primary w-100 py-2 fw-bold" type="submit">
             Confirm & Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedia;
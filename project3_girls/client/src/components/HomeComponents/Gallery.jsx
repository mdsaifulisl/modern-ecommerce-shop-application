import React, { useState } from "react";
import { useMedia } from "../../context/MediaContext";

const Gallery = () => {
  const { media } = useMedia();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // 1. Filter and sanitize data
  const filteredMedia = Array.isArray(media)
    ? media.filter((item) => item.type === "gallery")
    : [];

  // 2. Extract all unique categories for filtering
  const categories = ["all", ...new Set(filteredMedia
    .map((item) => item.category)
    .filter(Boolean)
  )];

  // 3. Prepare images
  const images = filteredMedia.map((item) => ({
    id: item._id,
    src:
      item.images?.[0] ||
      item.imageUrl ||
      item.image ||
      "https://picsum.photos/600/400",
    title: item.title || "",
    category: item.category || "",
  }));

  // 4. Filter images by category
  const filteredImages = activeFilter === "all" 
    ? images 
    : images.filter((img) => img.category === activeFilter);

  // 5. Handle image click for lightbox
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // 6. Close lightbox
  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  // 7. Empty State
  if (images.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body py-5">
                <i className="bi bi-images fs-1 text-muted mb-3 d-block"></i>
                <h5 className="card-title mb-2">No Gallery Images Found</h5>
                <p className="card-text text-muted">
                  Upload some images to see them displayed here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid py-5 bg-light">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-5">
            <h3 className="section-title p-0 m-0">Our Gallery</h3>
            <p className="lead text-muted">
              Browse through our collection of images
            </p>
          </div>

          {/* Filter Buttons (Optional - can be removed if not needed) */}
          {categories.length > 1 && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`btn btn-sm ${
                        activeFilter === category
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setActiveFilter(category)}
                    >
                      {category === "all" ? "All" : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Gallery Grid - Images Only */}
          <div className="row g-4">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2" // 2 images on xs, 3 on md, 4 on lg, 6 on xl
              >
                <div 
                  className="card border-0 shadow-sm overflow-hidden gallery-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleImageClick(img)}
                >
                  {/* Image Only - Square Aspect Ratio */}
                  <div className="ratio ratio-1x1">
                    <img
                      src={img.src}
                      className="card-img-top object-fit-cover"
                      alt={img.title || "Gallery image"}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Hover Overlay */}
                    <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-0 transition-opacity d-flex align-items-center justify-content-center">
                      <i className="bi bi-zoom-in text-white fs-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results for filter */}
          {filteredImages.length === 0 && categories.length > 1 && (
            <div className="text-center py-5">
              <i className="bi bi-filter-circle fs-1 text-muted mb-3 d-block"></i>
              <h5>No images found for "{activeFilter}"</h5>
              <button
                className="btn btn-link"
                onClick={() => setActiveFilter("all")}
              >
                Show all images
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal - Image Only */}
      {selectedImage && (
        <div 
          className="modal fade show d-block" 
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.9)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999 
          }}
          onClick={handleCloseLightbox}
        >
          <div className="modal-dialog modal-dialog-centered m-0" style={{ maxWidth: '100%', height: '100vh' }}>
            <div className="modal-content border-0 bg-transparent h-100">
              <div className="modal-header border-0 position-absolute top-0 end-0 z-1">
                <button
                  type="button"
                  className="btn-close btn-close-white bg-dark bg-opacity-50 rounded-circle p-3"
                  onClick={handleCloseLightbox}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex align-items-center justify-content-center h-100 p-0">
                <img
                  src={selectedImage.src}
                  className="img-fluid"
                  alt={selectedImage.title || "Gallery image"}
                  style={{ 
                    maxHeight: '90vh',
                    maxWidth: '90vw',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom CSS for hover effects */}
      <style jsx>{`
        .gallery-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gallery-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 0.7 !important;
        }
        .transition-opacity {
          transition: opacity 0.3s ease;
        }
        
        /* Responsive adjustments */
        @media (max-width: 576px) {
          .col-6 {
            padding: 8px !important;
          }
          .g-4 {
            --bs-gutter-y: 16px !important;
          }
        }
        
        /* Image hover animation */
        .gallery-card img {
          transition: transform 0.5s ease;
        }
        .gallery-card:hover img {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default Gallery;
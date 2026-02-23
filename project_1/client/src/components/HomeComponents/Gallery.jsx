import { useMedia } from "../../context/MediaContext";

// ...existing code...
const Gallery = () => {
  const { media } = useMedia();

  const filteredMedia = Array.isArray(media)
    ? media.filter((item) => item.type === "gallery")
    : [];

  const images = filteredMedia.map((item) => ({
    id: item._id,
    src: item.imageUrl || "https://picsum.photos/id/10/600/400",
    title: item.title || "Photo",
    category: item.category || "",
  }));

  return (
    <div>
      {images.length > 0 && (
        <div className="container-fluid py-3">
          <div className="text-center mb-5 pb-5">
            <h3 className="fw-bold">Our Photo Gallery</h3>
            <p className="text-muted">Capturing moments and exploring details</p>
          </div>

          <div className="row g-4">
            {images.map((image) => (
              <div key={image.id} className="col-12 col-sm-6 col-lg-4">
                <div className="gallery-item position-relative overflow-hidden rounded shadow-sm">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="img-fluid w-100 transition-all"
                    style={{
                      height: "300px",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                  />
                  <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white p-3">
                    <h5 className="mb-0 fw-bold">{image.title}</h5>
                    <small>{image.category}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
// ...existing code...

export default Gallery;

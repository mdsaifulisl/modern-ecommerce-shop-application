import { useMedia } from "../../context/MediaContext";

const Gallery = () => {
  const { media } = useMedia();

  const filteredMedia = Array.isArray(media)
    ? media.filter((item) => item.type === "gallery")
    : [];

  const images = filteredMedia.map((item) => ({
    id: item._id,

    src:
      item.images?.[0] ||
      item.imageUrl ||
      item.image ||
      "https://picsum.photos/600/400",

    title: item.title || "Photo",
    category: item.category || "",
  }));

  if (images.length === 0) {
    return (
      <div className="container py-5 text-center text-muted">
        No gallery images found
      </div>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2">Our Gallery</h2>
          <p className="text-muted">
            Beautiful moments captured for you
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="row g-4">

          {images.map((image) => (
            <div key={image.id} className="col-12 col-sm-6 col-lg-4">

              <div className="gallery-card position-relative overflow-hidden rounded-4 shadow">

                {/* Image */}
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-100 gallery-img"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=No+Image";
                  }}
                />

                {/* Overlay */}
                <div className="gallery-layer d-flex flex-column justify-content-end p-3">

                  <h5 className="text-white fw-bold mb-1">
                    {image.title}
                  </h5>

                  {image.category && (
                    <small className="text-light">
                      {image.category}
                    </small>
                  )}

                </div>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* Inline CSS */}
      <style>{`

        .gallery-card {
          height: 300px;
          cursor: pointer;
          transition: all 0.4s ease;
          background: #000;
        }

        .gallery-img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-layer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.8),
            rgba(0,0,0,0.2),
            transparent
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        /* Hover Effects */
        .gallery-card:hover .gallery-img {
          transform: scale(1.1);
        }

        .gallery-card:hover .gallery-layer {
          opacity: 1;
        }

      `}</style>
    </section>
  );
};

export default Gallery;

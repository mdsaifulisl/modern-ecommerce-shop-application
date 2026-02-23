
const Gallery = () => {
    //$1200 \times 800$
  const images = [
    { id: 1, src: "https://picsum.photos/id/10/600/400", title: "Nature 1", category: "Landscape" },
    { id: 2, src: "https://picsum.photos/id/20/600/800", title: "Architecture", category: "City" },
    { id: 3, src: "https://picsum.photos/id/30/600/400", title: "Nature 2", category: "Landscape" },
    { id: 4, src: "https://picsum.photos/id/40/600/400", title: "Lifestyle", category: "People" },
    { id: 5, src: "https://picsum.photos/id/50/600/700", title: "Cityscape", category: "City" },
    // { id: 6, src: "https://picsum.photos/id/60/600/400", title: "Forest", category: "Landscape" },
    { id: 6, src: "/slider2.png", title: "Forest", category: "Landscape" },
  ];

  return (
    <div className="container-fluid py-3">
      <div className="text-center mb-5 pb-5">
        <h2 className="fw-bold">Our Photo Gallery</h2>
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
                  transition: "transform 0.5s ease"
                }}
              />
              
              {/* Overlay on Hover */}
              <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white p-3">
                <h5 className="mb-0 fw-bold">{image.title}</h5>
                <small>{image.category}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Gallery;
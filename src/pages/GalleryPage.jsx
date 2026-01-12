import { useEffect, useState } from "react";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby_ZkW1SctI4LPhoe3MuCBaWuuJw_iM23tNPhGejIrK8sr9rP04pEeKimAKD1rPJsU7/exec";

function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(APPS_SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        setImages(data.reverse()); // newest first
        setLoading(false);
      })
      .catch(err => {
        console.error("Gallery fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Loading gallery...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Project Gallery</h1>

      {images.length === 0 ? (
        <p>No images uploaded yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
            >
 <img
  src={img.imageUrl}
  alt={img.fileName}
  referrerPolicy="no-referrer-when-downgrade"
  crossOrigin="anonymous"
  loading="lazy"
  style={{
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
  }}
/>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryPage;

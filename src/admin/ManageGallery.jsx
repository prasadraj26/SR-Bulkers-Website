import { useState } from "react";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby_ZkW1SctI4LPhoe3MuCBaWuuJw_iM23tNPhGejIrK8sr9rP04pEeKimAKD1rPJsU7/exec";

function ManageGallery() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = () => {
    if (!file) return alert("Select an image");

    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64 = reader.result.split(",")[1];

        const formData = new FormData();
        formData.append("image", base64);
        formData.append("fileName", file.name);
        formData.append("mimeType", file.type);

        const res = await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.error);

        alert("Image uploaded successfully");
        setFile(null);
      } catch (err) {
        console.error(err);
        alert("Upload failed");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Gallery</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <>
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            style={{ width: 300, marginTop: 10 }}
          />
          <br />
          <button onClick={uploadImage} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}
    </div>
  );
}

export default ManageGallery;

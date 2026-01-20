import { ref, push, set } from "firebase/database";
import { db } from "../firebase";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadGalleryImage(file) {
  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const data = await response.json();

    // Save metadata to Firebase
    const galleryRef = ref(db, "gallery");
    const newImageRef = push(galleryRef);

    const imageData = {
      imageUrl: data.secure_url,
      publicId: data.public_id,
      fileName: file.name,
      uploadedAt: new Date().toISOString(),
      uploadedAtTimestamp: Date.now(),
    };

    await set(newImageRef, imageData);

    return { success: true, data: imageData };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

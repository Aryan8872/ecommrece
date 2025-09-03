import React, { useState } from "react";
import { useFirst } from "../context/FirstContext";

const FileUpload = () => {
  const { updateProfileImage, user, IMAGE_BASE } = useFirst();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setUploadStatus("");
    setPreviewUrl(f ? URL.createObjectURL(f) : "");
  };

  const handleUpload = async () => {
    if (!file || !user?._id) {
      setUploadStatus("Select a file and ensure you're logged in.");
      return;
    }

    try {
      const res = await updateProfileImage({ userId: user._id, file });
      setUploadStatus("Profile image updated");
    } catch (err) {
      setUploadStatus(err?.message || "Upload failed");
    }
  };

  const currentImage = user?.profileImage
    ? `http://localhost:8080${user.profileImage}`
    : "";

  return (
    <div style={{ margin: "2rem", fontFamily: "Arial" }}>
      <h2>Update profile image</h2>

      {currentImage && (
        <div style={{ marginBottom: "1rem" }}>
          <div>Current:</div>
          <img src={currentImage} alt="Current" style={{ maxWidth: 200 }} />
        </div>
      )}

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "1rem" }}>
        Upload
      </button>

      {previewUrl && (
        <div>
          <div>Preview:</div>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: 200 }} />
        </div>
      )}

      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;

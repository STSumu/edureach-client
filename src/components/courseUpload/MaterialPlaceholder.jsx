import React from "react";

const MaterialPlaceholder = ({
  material,
  index,
  uploadingMaterials,
  removeMaterial,
  updateMaterial,
  uploadMaterial,
  materials,
}) => {
  const isUploading = uploadingMaterials.has(material.id);
  const isUploaded = material.isUploaded;

  return (
    <div className={`video-placeholder ${isUploaded ? "uploaded" : ""}`}>
      <style>{`
        .video-placeholder {
          background: #fdf8f6;
          border: 2px dashed #f3d4c3;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
          position: relative;
        }
        .video-placeholder.uploaded {
          background: #f0fdf4;
          border-color: #16a34a;
        }
        .placeholder-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .placeholder-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2d3748;
        }
        .upload-status {
          color: #16a34a;
          font-size: 0.9rem;
          margin-left: 8px;
        }
        .remove-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 0.8rem;
          cursor: pointer;
        }
        .remove-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .placeholder-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
        }
        .input-label {
          font-size: 0.9rem;
          color: #4a5568;
          margin-bottom: 5px;
        }
        .input-field {
          padding: 10px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }
        .input-field:focus {
          outline: none;
          border-color: #B14E0F;
        }
        .input-field:disabled {
          background: #f9fafb;
          color: #6b7280;
        }
        .link-upload {
          grid-column: 1 / -1;
        }
        .upload-section {
          margin-top: 20px;
          text-align: center;
        }
        .upload-btn {
          background: linear-gradient(135deg, #B14E0F, #8A2E00);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }
        .upload-btn.uploading {
          background: #9ca3af;
        }
        .upload-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div className="placeholder-header">
        <h3 className="placeholder-title">
          Material {index + 1}
          {isUploaded && <span className="upload-status">✓ Uploaded</span>}
        </h3>
        {materials.length > 1 && !isUploaded && (
          <button
            className="remove-btn"
            onClick={() => removeMaterial(material.id)}
            disabled={isUploading}
          >
            Remove
          </button>
        )}
      </div>

      <div className="placeholder-inputs">
        <div className="input-group">
          <label className="input-label">Title</label>
          <input
            type="text"
            className="input-field"
            value={material.title}
            placeholder="Enter material title"
            onChange={(e) => updateMaterial(material.id, "title", e.target.value)}
            disabled={isUploaded}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Order</label>
          <input
            type="number"
            className="input-field"
            value={material.order}
            min="1"
            onChange={(e) =>
              updateMaterial(material.id, "order", parseInt(e.target.value) || 1)
            }
            disabled={isUploaded}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Type</label>
          <select
            className="input-field"
            value={material.type}
            onChange={(e) => updateMaterial(material.id, "type", e.target.value)}
            disabled={isUploaded}
          >
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="link">Link</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="input-group link-upload">
          <label className="input-label">Link/URL</label>
          <input
            type="url"
            className="input-field"
            value={material.link}
            placeholder="Enter link"
            onChange={(e) => updateMaterial(material.id, "link", e.target.value)}
            disabled={isUploaded}
          />
        </div>
      </div>

      {!isUploaded && (
        <div className="upload-section">
          <button
            className={`upload-btn ${isUploading ? "uploading" : ""}`}
            onClick={() => uploadMaterial(material.id)}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Material"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MaterialPlaceholder;

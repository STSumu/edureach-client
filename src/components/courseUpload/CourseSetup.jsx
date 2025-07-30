import React, { useState } from "react";
import MaterialPlaceholder from "./MaterialPlaceholder";
import "./Upload.css"; // you can keep this or remove if styles overlap

const CourseSetup = ({ goBack }) => {
  const [materials, setMaterials] = useState([]);
  const [uploadingMaterials, setUploadingMaterials] = useState(new Set());

  const addMoreMaterial = () => {
    const newMaterial = {
      id: Date.now(),
      title: "",
      order: materials.length + 1,
      link: "",
      type: "video",
      isUploaded: false,
    };
    setMaterials([...materials, newMaterial]);
  };

  const updateMaterial = (id, field, value) => {
    setMaterials(
      materials.map((material) =>
        material.id === id ? { ...material, [field]: value } : material
      )
    );
  };

  const removeMaterial = (id) => {
    const updated = materials.filter((m) => m.id !== id);
    setMaterials(updated.map((m, idx) => ({ ...m, order: idx + 1 })));
  };

  const uploadMaterial = async (id) => {
    const material = materials.find((m) => m.id === id);
    if (!material.title.trim() || !material.link.trim()) {
      alert("Please fill all fields before uploading!");
      return;
    }

    setUploadingMaterials((prev) => new Set([...prev, id]));
    await new Promise((res) => setTimeout(res, 2000));

    setMaterials(
      materials.map((m) => (m.id === id ? { ...m, isUploaded: true } : m))
    );
    setUploadingMaterials((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const canAddMore = () =>
    materials.length === 0 || materials.every((m) => m.isUploaded);

  return (
    <div className="video-setup">
      {/* Theme styles inline to match Upload component */}
      <style>{`
        .video-setup {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 40px;
          max-width: 900px;
          width: 100%;
          font-family: 'Segoe UI', sans-serif;
          color: #2c3e50;
          margin: auto;
          box-sizing: border-box;
        }
        .back-btn {
          background: transparent;
          border: none;
          font-size: 1rem;
          color: #B14E0F;
          cursor: pointer;
          margin-bottom: 20px;
          transition: color 0.3s ease;
        }
        .back-btn:hover {
          color: #8A2E00;
        }
        .setup-title {
          font-size: 2rem;
          margin-bottom: 30px;
          font-weight: 600;
          text-align: center;
          color: #B14E0F;
        }
        .add-more-btn {
          background: linear-gradient(135deg, #B14E0F, #8A2E00);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 12px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 30px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          box-shadow: 0 5px 15px rgba(177, 78, 15, 0.4);
          transition: background 0.3s ease;
        }
        .add-more-btn:hover {
          background: linear-gradient(135deg, #8A2E00, #B14E0F);
        }
      `}</style>

      <button className="back-btn" onClick={goBack}>
        ← Back to Course Types
      </button>
      <h2 className="setup-title">Set up your course materials</h2>

      {materials.map((material, index) => (
        <MaterialPlaceholder
          key={material.id}
          material={material}
          index={index}
          uploadingMaterials={uploadingMaterials}
          removeMaterial={removeMaterial}
          updateMaterial={updateMaterial}
          uploadMaterial={uploadMaterial}
          materials={materials}
        />
      ))}

      {canAddMore() && (
        <button className="add-more-btn" onClick={addMoreMaterial}>
          + Add Material
        </button>
      )}
    </div>
  );
};

export default CourseSetup;
  
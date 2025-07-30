import React, { useState } from "react";
import MaterialPlaceholder from "./MaterialPlaceholder";
import { useContext } from "react";
import { authContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const CourseSetup = ({ courseId,goBack }) => {
  const [materials, setMaterials] = useState([]);
  const [uploadingMaterials, setUploadingMaterials] = useState(new Set());
  const {baseUrl,getTokenHeader}=useContext(authContext);

  const addMoreMaterial = () => {
    const newMaterial = {
      id:new Date(),
      courseId,
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

  const headers = await getTokenHeader();
  try {
    setUploadingMaterials((prev) => new Set([...prev, id]));
    const res = await fetch(`${baseUrl}/teach/mat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(material),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Upload failed");
    }

    const returned = data.material;
    
    setMaterials((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...returned,
              isUploaded: true, // maintain upload state
            }
          : m
      )
    );
    Swal.fire({
            title: "Success",
            icon: "success",
            text: `Material Successfully Uploaded.`,
            draggable: true,
          });
  } catch (err) {
    console.error("Upload failed:", err);
    alert(err.message);
  } finally {
    setUploadingMaterials((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }
};


  const canAddMore = () =>
    materials.length === 0 || materials.every((m) => m.isUploaded);

  return (
    <div className="bg-white rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] px-6 md:px-10 py-10 max-w-[900px] w-full mx-auto font-sans text-[#2c3e50] box-border">
      <button
        className="bg-transparent border-none text-[#B14E0F] text-base cursor-pointer mb-5 hover:text-[#8A2E00] transition-colors duration-300"
        onClick={goBack}
      >
        ← Back to Course Types
      </button>
      <h2 className="text-[2rem] mb-8 font-semibold text-center text-[#B14E0F]">
        Set up your course materials
      </h2>

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
        <button
          className="bg-gradient-to-br from-[#B14E0F] to-[#8A2E00] text-white border-none px-8 py-3 rounded-xl text-base cursor-pointer mt-8 block mx-auto shadow-[0_5px_15px_rgba(177,78,15,0.4)] hover:from-[#8A2E00] hover:to-[#B14E0F] transition-all duration-300"
          onClick={addMoreMaterial}
        >
          + Add Material
        </button>
      )}
    </div>
  );
};

export default CourseSetup;

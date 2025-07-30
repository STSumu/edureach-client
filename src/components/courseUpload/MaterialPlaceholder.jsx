import React from "react";

const MaterialPlaceholder = ({
  material,
  index,
  uploadingMaterials,
  removeMaterial,
  uploadMaterial,
  updateMaterial,
  materials,
}) => {
  const isUploading = uploadingMaterials.has(material.id);
  const isUploaded = material.isUploaded;

  const handleChange = (field, value) => {
    updateMaterial(material.id, field, value);
  };

  return (
    <div
      className={`transition-all relative rounded-xl p-6 mb-5 border-2 ${
        isUploaded
          ? "bg-green-50 border-green-600"
          : "bg-[#fdf8f6] border-[#f3d4c3]"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-[#2d3748]">
          Material {index + 1}
          {isUploaded && (
            <span className="text-green-600 text-sm font-normal ml-2">✓ Uploaded</span>
          )}
        </h3>
        {materials.length > 1 && !isUploaded && (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => removeMaterial(material.id)}
            disabled={isUploading}
          >
            Remove
          </button>
        )}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor={`title-${material.id}`} className="text-sm text-gray-700 mb-1">
            Title
          </label>
          <input
            id={`title-${material.id}`}
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#B14E0F] disabled:bg-gray-100 disabled:text-gray-500"
            value={material.title}
            placeholder="Enter material title"
            disabled={isUploaded}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor={`order-${material.id}`} className="text-sm text-gray-700 mb-1">
            Order
          </label>
          <input
            id={`order-${material.id}`}
            type="number"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#B14E0F] disabled:bg-gray-100 disabled:text-gray-500"
            value={material.order}
            min="1"
            disabled={isUploaded}
            onChange={(e) => handleChange("order", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor={`type-${material.id}`} className="text-sm text-gray-700 mb-1">
            Type
          </label>
          <select
            id={`type-${material.id}`}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#B14E0F] disabled:bg-gray-100 disabled:text-gray-500"
            value={material.type}
            disabled={isUploaded}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="link">Link</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col md:col-span-2">
          <label htmlFor={`link-${material.id}`} className="text-sm text-gray-700 mb-1">
            Link/URL
          </label>
          <input
            id={`link-${material.id}`}
            type="url"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#B14E0F] disabled:bg-gray-100 disabled:text-gray-500"
            value={material.link}
            placeholder="Enter link"
            disabled={isUploaded}
            onChange={(e) => handleChange("link", e.target.value)}
          />
        </div>
      </div>

      {/* Upload Button */}
      {!isUploaded && (
        <div className="text-center mt-5">
          <button
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-br from-[#B14E0F] to-[#8A2E00] hover:from-[#8A2E00] hover:to-[#B14E0F]"
            }`}
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

import React, { useContext, useState } from "react";
import { authContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CourseRequestPage = () => {
  const {baseUrl,getTokenHeader}=useContext(authContext);
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseDescription: "",
    startDate: "",
    price: "",
    introUrl: "",
    courseImageUrl: "", 
  });
  const navigate=useNavigate();
  const imgKey = import.meta.env.VITE_ImgKey;
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        const imageUrl = data.data.url;
        setCourseData((prev) => ({
          ...prev,
          courseImageUrl: imageUrl,
        }));
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitRequest = async () => {
    if (
      !courseData.courseName ||
      !courseData.courseDescription ||
      !courseData.startDate ||
      !courseData.price ||
      !courseData.courseImageUrl
    ) {
      alert("Please fill all required fields and upload an image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const headers=await getTokenHeader();
      const res = await fetch(`${baseUrl}/teach/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json",...headers },
        body: JSON.stringify({
          course_name: courseData.courseName,
          course_description: courseData.courseDescription,
          start_date: courseData.startDate,
          price: courseData.price,
          intro_url: courseData.introUrl,
          course_image_url: courseData.courseImageUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit course request");

      Swal.fire({
              title: "Success",
              icon: "success",
              text: `Course Request Submitted Successfully`,
              draggable: true,
            })
            .then((res)=>{
              if(res.isConfirmed){
                 navigate('/teacher/courses', { replace: true });
              }
            })
      setCourseData({
        courseName: "",
        courseDescription: "",
        startDate: "",
        price: "",
        introUrl: "",
        courseImageUrl: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting course request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEBF9F]/10 p-2 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create New Course
        </h1>

        {/* Course Name */}
        <label className="block mb-1 font-medium">Course Name *</label>
        <input
          type="text"
          value={courseData.courseName}
          onChange={(e) => handleInputChange("courseName", e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-[#B14E0F] rounded"
          placeholder="Enter course name"
        />

        {/* Course Description */}
        <label className="block mb-1 font-medium">Course Description *</label>
        <textarea
          value={courseData.courseDescription}
          onChange={(e) => handleInputChange("courseDescription", e.target.value)}
          rows={4}
          className="w-full mb-4 px-3 py-2 border border-[#B14E0F] rounded"
          placeholder="Enter course description"
        />

        {/* Start Date */}
        <label className="block mb-1 font-medium">Start Date *</label>
        <input
          type="date"
          value={courseData.startDate}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-[#B14E0F] rounded"
        />

        {/* Price */}
        <label className="block mb-1 font-medium">Price (in USD) *</label>
        <input
          type="number"
          value={courseData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-[#B14E0F] rounded"
          placeholder="Enter course price"
          min="0"
          step="0.01"
        />

        {/* Intro URL */}
        <label className="block mb-1 font-medium">Intro URL (optional)</label>
        <input
          type="url"
          value={courseData.introUrl}
          onChange={(e) => handleInputChange("introUrl", e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-[#B14E0F] rounded"
          placeholder="https://example.com/intro"
        />

        {/* Image Upload */}
        <label className="block mb-1 font-medium">Upload Course Image *</label>
        <input type="file" accept="image/*" className="w-full mb-4 px-3 py-2 border border-[#B14E0F] rounded" onChange={handleImageUpload} />
        {uploading && <p className="text-sm text-gray-600">Uploading image...</p>}

        {courseData.courseImageUrl && (
          <img
            src={courseData.courseImageUrl}
            alt="Course"
            className="mt-4 w-full md:max-w-xs rounded shadow"
          />
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmitRequest}
          disabled={
            isSubmitting ||
            !courseData.courseName ||
            !courseData.courseDescription ||
            !courseData.startDate ||
            !courseData.price ||
            !courseData.courseImageUrl
          }
          className={`mt-6 w-full px-6 py-3 font-semibold rounded 
            border-0 shadow-lg text-lg  ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#B14E0F] text-white hover:bg-[#B14E0F]"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Course Request"}
        </button>
      </div>
    </div>
  );
};

export default CourseRequestPage;

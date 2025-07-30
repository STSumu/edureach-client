import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authContext } from "../../context/AuthProvider";
import Loading from "../../components/Loading";
import { FaUserCircle } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import Swal from "sweetalert2";

const CourseDetail = () => {
  const { reqId } = useParams();
  const [course, setCourse] = useState();
  const [showForm, setShowForm] = useState(false);
  const [data,setData]=useState({
    price:0,
    revenue:0,
    discount:0,
  })
  
  const [loading, setLoading] = useState(false);
  const { baseUrl, getTokenHeader } = useContext(authContext);
  const fetchData = async () => {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/admin/request/${reqId}`, { headers });
      const data = await res.json();
      setCourse(data[0]);
    };
  useEffect(() => {
    
    fetchData();
  }, [baseUrl, getTokenHeader, reqId]);

  if (!course) return <Loading />;

  const {
    course_name,
    status,
    img_url,
    course_description,
    req_price,
    requested_at,
    approved_at,
    start_date,
    intro_url,
    instructor,
    instructor_img,
    instructor_id,
  } = course;

  let tagColor =
    status === "accepted"
      ? "bg-green-500"
      : status === "pending"
      ? "bg-orange-500"
      : status === "declined"
      ? "bg-red-500"
      : "bg-gray-400";

  

  const handleApprove = async () => {
    setLoading(true);
    try {
      const headers = {
        ...(await getTokenHeader()),
        "Content-Type": "application/json",
      };
      const res = await fetch(`${baseUrl}/admin/approve/${reqId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to approve course request");
      const result = await res.json();
      if (result.courseId) {
        await fetchData();
        Swal.fire({
          title: "Course Approved",
          text: "Course has been published successfully.",
          icon: "success",
        });
      }
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleDecline=()=>{

  }
  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";
  
  const handleUpdateDiscount = async () => {
  setLoading(true);
  try {
    const headers = {
      ...(await getTokenHeader()),
      "Content-Type": "application/json",
    };
    const res = await fetch(`${baseUrl}/admin/course/${reqId}/discount`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ discount: data.discount }),
    });
    if (!res.ok) throw new Error("Failed to update discount");
    alert("Discount updated successfully!");
  } catch (err) {
    alert(err.message);
  }
  setLoading(false);
};
if(loading) return <Loading></Loading>

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold italic">{course_name}</h2>
        <span
          className={`${tagColor} text-white px-3 py-1 rounded shadow uppercase font-semibold`}
        >
          {status}
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img
            src={img_url}
            alt={course_name}
            className="rounded-lg object-cover w-80 h-52 shadow-md"
          />
        </div>
        <div className="flex flex-col justify-center items-center text-center text-lg leading-relaxed">
          <p className="mb-8">{course_description || "No description provided."}</p>
          <div className="grid grid-cols-1 gap-6 text-sm text-gray-700">
            <div>
              <strong>Requested Price:</strong> ${req_price ?? "N/A"}
            </div>
            <div>
              <strong>Requested At:</strong> {formatDate(requested_at)}
            </div>
            <div>
              <strong>Approved At:</strong> {formatDate(approved_at)}
            </div>
            <div>
              <strong>Start Date:</strong> {formatDate(start_date)}
            </div>
            {intro_url && (
              <div>
                <strong>Intro Video:</strong>{" "}
                <a
                  href={intro_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Watch Intro
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructor */}
      {instructor && (
        <div className="flex items-center gap-6 border-t border-[#B14E0F] pt-6">
          {instructor_img ? (
            <img
              src={instructor_img}
              alt={instructor}
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
          ) : (
            <FaUserCircle size={80} />
          )}
          <div>
            <h3 className="text-xl font-semibold">{instructor}</h3>
            <Link
              to={`/admin/instructor/${instructor_id}`}
              className="text-[#B14E0F] underline hover:text-[#B14E0F]"
            >
              View Instructor Profile
            </Link>
          </div>
        </div>
      )}

      
      {/* Before approval: full form */}
{!["accepted"].includes(status) && showForm && (
  <div className="mt-6 border p-4 rounded shadow-sm space-y-4">
    {/* Price input */}
    <div>
      <label htmlFor="price" className="block font-semibold mb-1">
        Set Final Course Price ($)
      </label>
      <input
        id="price"
        type="number"
        value={data.price}
        onChange={(e) => setData({ ...data, price: parseFloat(e.target.value) })}
        className="w-full border rounded px-3 py-2"
      />
    </div>

    {/* Revenue input */}
    <div>
      <label htmlFor="percentage" className="block font-semibold mb-1">
        Instructor Revenue Share (%)
      </label>
      <input
        id="percentage"
        type="number"
        min={0}
        max={100}
        value={data.revenue}
        onChange={(e) => setData({ ...data, revenue: parseFloat(e.target.value) })}
        className="w-full border rounded px-3 py-2"
      />
    </div>

    {/* Discount slider */}
    <div>
      <label className="block font-semibold mb-1">Discount (%)</label>
      <Slider
        value={data.discount}
        onChange={(e, newVal) => setData({ ...data, discount: newVal })}
        max={100}
        valueLabelDisplay="auto"
      />
    </div>

    {/* Summary */}
    <div className="text-sm text-gray-700 space-y-1">
      <p>Final Price: ${data.price || "0.00"}</p>
      <p>Instructor Share: {data.revenue || 0}%</p>
      <p>Discount: {data.discount || 0}%</p>
    </div>

    <button
      onClick={handleApprove}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mt-3"
    >
      Confirm Approval
    </button>
  </div>
)}

{/* After approval: only discount slider (always visible) */}
{status === "accepted" && (
  <div className="mt-6 border p-4 rounded shadow-sm space-y-4">
    <div>
      <label className="block font-semibold mb-1">Discount (%)</label>
      <Slider
        value={data.discount}
        onChange={(e, newVal) => setData({ ...data, discount: newVal })}
        max={100}
        valueLabelDisplay="auto"
      />
    </div>

    <div className="text-sm text-gray-700 space-y-1">
      <p>Discount: {data.discount || 0}%</p>
    </div>

    <button
      onClick={handleUpdateDiscount}  // Separate handler to update discount only
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mt-3"
    >
      Update Discount
    </button>
  </div>
)}



      
      {status !== "accepted" && !showForm && (
        <div className="flex gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Approve
          </button>
          <button
            onClick={handleDecline}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded"
          >
            Decline
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
          >
            Later
          </button>
        </div>
      )}
      
    </div>
  );
};

export default CourseDetail;

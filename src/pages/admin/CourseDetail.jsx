import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authContext } from "../../context/AuthProvider";
import Loading from "../../components/Loading";
import { FaUserCircle } from "react-icons/fa";
import Slider from "@mui/material/Slider";

const CourseDetail = () => {
  const { reqId } = useParams();
  const [course, setCourse] = useState();
  const [showForm, setShowForm] = useState(false);
  const [price, setPrice] = useState("");
  const [percentage, setPercentage] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { baseUrl, getTokenHeader } = useContext(authContext);

  useEffect(() => {
    const fetchData = async () => {
      const headers = await getTokenHeader();
      const res = await fetch(`${baseUrl}/admin/request/${reqId}`, { headers });
      const data = await res.json();
      setCourse(data[0]);
    };
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

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  const handleApprove = async () => {
    setLoading(true);
    try {
      const headers = {
        ...(await getTokenHeader()),
        "Content-Type": "application/json",
      };
      const res = await fetch(`${baseUrl}/admin/request/${reqId}/approve`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ price, percentage, discount }),
      });
      if (!res.ok) throw new Error("Failed to approve request");
      alert("Course approved successfully!");
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleDecline = () => {
    alert("Decline clicked - implement API call");
  };

  const handleLater = () => {
    alert("Later clicked - implement accordingly");
  };

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

      {/* Approval Form */}
      {showForm && (
        <div className="mt-6 border p-4 rounded shadow-sm space-y-4">
          <div>
            <label htmlFor="price" className="block font-semibold mb-1">
              Set Final Course Price ($)
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="percentage" className="block font-semibold mb-1">
              Instructor Revenue Share (%)
            </label>
            <input
              id="percentage"
              type="number"
              min={0}
              max={100}
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Discount (%)</label>
            <Slider
              value={discount}
              onChange={(e, newVal) => setDiscount(newVal)}
              max={100}
              valueLabelDisplay="auto"
            />
          </div>

          {/* Summary */}
          <div className="text-sm text-gray-700 space-y-1">
            <p>Final Price: ${price || "0.00"}</p>
            <p>Instructor Share: {percentage || 0}%</p>
            <p>Discount: {discount}%</p>
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

      {/* Action buttons */}
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
            onClick={handleLater}
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

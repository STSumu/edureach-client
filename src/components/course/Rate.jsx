import React, { useState } from 'react';
import { useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { authContext } from '../../context/AuthProvider';

const Rate = ({ courseId, onRate }) => {
    const {dbUser,baseUrl}=useContext(authContext);
  const ratings = [
    { value: 0.5, text: 'Awful, not what I expected at all' },
    { value: 1.0, text: 'Awful / Poor' },
    { value: 1.5, text: 'Poor, pretty disappointed' },
    { value: 2.0, text: 'Poor / Average' },
    { value: 2.5, text: 'Average, could be better' },
    { value: 3.0, text: 'Average / Good' },
    { value: 3.5, text: 'Good, what I expected' },
    { value: 4.0, text: 'Good / Amazing' },
    { value: 4.5, text: 'Amazing, above expectations!' },
    { value: 5.0, text: 'Perfect! Highly recommend!' },
  ];

  const [selectedRating, setSelectedRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState('');

  const handleRatingChange = (value) => {
    setSelectedRating(value);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    const comment=e.target.comment.value;
    const rate= {
      userId:dbUser.user_id,
      courseId,
      rating: selectedRating,
      comment,
    };
    fetch(`${baseUrl}/rate`,{
        method:'POST',
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify(rate),
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.ratings_id){
           document.getElementById('my_modal_7').checked = false;
        }
        else{
            alert('Error updating ratings');
        }
    })
    if (onRate) {
      onRate({ courseId, rating: selectedRating, comment });
    }

  };

  const getRatingText = () => {
    const match = ratings.find(r => r.value === (hoveredRating ?? selectedRating));
    return match ? match.text : '';
  };

  return (
    <div>
      {/* Button to open modal */}
      <label htmlFor="my_modal_7" className="btn shadow-0 border-0 flex flex-row items-center gap-2">
        <FaStar className="text-yellow-400" />
        <p className="hidden md:flex text-xs flex-row">Leave a Rating</p>
      </label>

      {/* Modal */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box min-h-1/2 w-full md:w-2/3 lg:w-1/2 flex flex-col items-center justify-center relative">
          <label htmlFor="my_modal_7" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
          <h1 className="text-3xl font-bold my-4 text-center">How would you rate this course?</h1>

          <p className="mb-4 text-center text-gray-600">{getRatingText()}</p>

          {/* Rating Stars */}
          <div className="rating rating-lg rating-half">
            {ratings.map((rating) => {
              const half = rating.value % 1 !== 0;
              const isHoveredOrSelected =
                hoveredRating >= rating.value || (!hoveredRating && selectedRating >= rating.value);
              return (
                <input
                  key={rating.value}
                  type="radio"
                  name="rating"
                  className={`mask mask-star-2 ${half ? 'mask-half-1' : 'mask-half-2'} ${
                    isHoveredOrSelected ? 'bg-yellow-400' : 'bg-orange-300'
                  }`}
                  aria-label={`${rating.value} star`}
                  onMouseEnter={() => setHoveredRating(rating.value)}
                  onMouseLeave={() => setHoveredRating(null)}
                  onChange={() => handleRatingChange(rating.value)}
                  checked={selectedRating === rating.value}
                />
              );
            })}
          </div>

          {/* Comment Section (Appears After Selecting Rating) */}
          {showForm && (
            <form onSubmit={handleSubmit} className="flex flex-col justify-end w-full my-6 space-y-4">
              <textarea
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your personal experience taking this course. Was it a good match for you?"
                className="w-full min-h-[120px] p-4 rounded-lg border border-[#B14E0F] focus:outline-none focus:ring-2 focus:ring-[#B14E0F] focus:border-transparent shadow-sm resize-none text-gray-800 placeholder-gray-400"
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn bg-[#B14E0F] hover:bg-[#923d0c] text-white rounded-lg px-4 py-2"
                >
                  Save and Continue
                </button>
              </div>
            </form>
          )}
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
      </div>
    </div>
  );
};

export default Rate;

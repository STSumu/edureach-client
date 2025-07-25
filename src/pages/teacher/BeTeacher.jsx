import React, { useContext, useState } from 'react';
import EnrollNav from '../../components/enrolled/EnrollNav';
import { authContext } from '../../context/AuthProvider';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

const BeTeacher = () => {
    const {dbUser,baseUrl,getTokenHeader,promoteToTeacher}=useContext(authContext);
    const navigate=useNavigate();
  const [form, setForm] = useState({
    expertise: '',
    about: '',
    experience_years: '',
    linkedin: '',
    website: '',
  });
if(!dbUser) return <Loading></Loading>
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const headers=await getTokenHeader();
    e.preventDefault();
    console.log('Submitting instructor info:', form);

    try {
      const res = await fetch(`${baseUrl}/teach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',...headers },
        body: JSON.stringify(form),
      });
      const data=await res.json();
      if (!res.ok) throw new Error('Failed to save instructor info');
      if(data.teacher){
        console.log(data.instructor_id)
        navigate('/teacher');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting your instructor profile.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <EnrollNav />

      <div className="max-w-3xl mx-auto pb-10 pt-20 px-5 ">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Become an Instructor</h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Tell us about yourself so students can learn more about you and your teaching background.
        </p>


        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-800">
              Area of Expertise <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="expertise"
              placeholder="e.g., Web Development, AI, Data Science"
              value={form.expertise}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-[#B14E0F] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-800">
              About You <span className="text-red-500">*</span>
            </label>
            <textarea
              name="about"
              rows="4"
              placeholder="Share your experience, teaching style, and what students can expect from you."
              value={form.about}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-[#B14E0F] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-800">
              Years of Experience (optional)
            </label>
            <input
              type="number"
              name="experience_years"
              min="0"
              placeholder="e.g., 5"
              value={form.experience_years}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-[#B14E0F] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-800">
              LinkedIn Profile (optional)
            </label>
            <input
              type="url"
              name="linkedin"
              placeholder="https://linkedin.com/in/yourprofile"
              value={form.linkedin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-[#B14E0F] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-800">
              Personal Website (optional)
            </label>
            <input
              type="url"
              name="website"
              placeholder="https://yourwebsite.com"
              value={form.website}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-[#B14E0F] focus:outline-none"
            />
          </div>

          
          <div className="flex justify-between mt-10">
            <button
              type="submit"
              className="px-6 py-2 bg-[#B14E0F] text-white rounded-lg hover:bg-[#B14E0F]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeTeacher;

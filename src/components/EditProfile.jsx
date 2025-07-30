import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';

const EditProfile = () => {
  const navigate = useNavigate();
   const { baseUrl, user,getTokenHeader } = useContext(authContext);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    headline: '',
    biography: '',
    language: 'en-us',
    website: '',
    facebook: '',
    instagram: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeSection, setActiveSection] = useState('profile');
  const [headlineCount, setHeadlineCount] = useState(0);

  // ✅ Fetch user profile from backend
 // ✅ Fetch user profile from backend
const fetchUserProfile = async () => {
  try {

    const headers=await getTokenHeader();
    
    const res = await fetch(`${baseUrl}/user/profile`, {headers});
    
    if (res.ok) {
      const data = await res.json();
      
      const userData = Array.isArray(data) ? data[0] : data;

      const nameParts = userData.user_name?.split(' ') || [];
      setProfileData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: userData.email || '',
        headline: userData.headline || '',
        biography: userData.biography || '',
        language: userData.language || 'en-us',
        website: userData.website || '',
        facebook: userData.facebook || '',
        instagram: userData.instagram || ''
      });

      setHeadlineCount(userData.headline ? userData.headline.length : 0);
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'headline') {
      setHeadlineCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const headers = await getTokenHeader(); // get token from your auth context

    const response = await fetch(`${baseUrl}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers, // <-- add auth header
      },
      body: JSON.stringify(profileData)
    });

    if (response.ok) {
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.error('Failed to update profile', await response.text());
    }
  } catch (error) {
    console.error('Error saving profile:', error);
  } finally {
    setLoading(false);
  }
};

  const handleReset = () => {
    fetchUserProfile(); // Reset to DB values
  };

  const formatText = (command) => {
    const textarea = document.getElementById('biography');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let formattedText = '';
    if (command === 'bold') {
      formattedText = `**${selectedText}**`;
    } else if (command === 'italic') {
      formattedText = `*${selectedText}*`;
    }

    const newValue =
      textarea.value.substring(0, start) +
      formattedText +
      textarea.value.substring(end);

    setProfileData((prev) => ({ ...prev, biography: newValue }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + formattedText.length,
        start + formattedText.length
      );
    }, 0);
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', link: '/edit' },
    { id: 'photo', label: 'Photo', link: '/photo' },
    { id: 'close', label: 'Close account', danger: true, link: '/' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto flex bg-white shadow-lg">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200">
          <div className="text-center p-8 border-b border-gray-200">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 cursor-pointer hover:scale-105 transition-transform">
              {profileData.firstName.charAt(0)}
              {profileData.lastName.charAt(0)}
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {profileData.firstName} {profileData.lastName}
            </div>
          </div>
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li key={item.id} className="border-b border-gray-200">
                  <button
                    onClick={() => {
                      if (item.link) {
                        navigate(item.link);
                      } else {
                        setActiveSection(item.id);
                      }
                    }}
                    className={`w-full text-left px-6 py-4 font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-600 text-white'
                        : item.danger
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Public profile
            </h1>
            <p className="text-gray-600">Add information about yourself</p>
          </div>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
              {successMessage}
            </div>
          )}

          <div className="space-y-6">
            {/* Basics */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Basics:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Biography */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Biography
              </h2>
              <div className="mb-3">
                <div className="flex gap-2 p-3 bg-gray-50 rounded-t-lg border-2 border-gray-200 border-b-0">
                  <button
                    type="button"
                    onClick={() => formatText('bold')}
                    className="px-3 py-2 border border-gray-300 bg-white rounded font-bold hover:bg-gray-100 transition-colors"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => formatText('italic')}
                    className="px-3 py-2 border border-gray-300 bg-white rounded italic hover:bg-gray-100 transition-colors"
                  >
                    I
                  </button>
                </div>
                <textarea
                  id="biography"
                  name="biography"
                  value={profileData.biography}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 border-t-0 rounded-b-lg focus:border-purple-500 focus:outline-none transition-colors resize-vertical"
                />
              </div>
            </div>

            {/* Links */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Links:
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex">
                    <div className="bg-gray-100 border-2 border-gray-200 border-r-0 px-4 py-3 rounded-l-lg text-gray-600 font-medium">
                      facebook.com/
                    </div>
                    <input
                      type="text"
                      name="facebook"
                      value={profileData.facebook}
                      onChange={handleInputChange}
                      placeholder="Username"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 border-l-0 rounded-r-lg focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div className="bg-gray-100 border-2 border-gray-200 border-r-0 px-4 py-3 rounded-l-lg text-gray-600 font-medium">
                      instagram.com/
                    </div>
                    <input
                      type="text"
                      name="instagram"
                      value={profileData.instagram}
                      onChange={handleInputChange}
                      placeholder="Username"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 border-l-0 rounded-r-lg focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;

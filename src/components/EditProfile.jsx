// import React, { useState, useEffect } from 'react';

// const EditProfile = () => {
//   const [profileData, setProfileData] = useState({
//     firstName: 'Tasnia',
//     lastName: 'Tarannum',
//     headline: '',
//     biography: '',
//     language: 'en-us',
//     website: '',
//     facebook: '',
//     instagram: ''
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [activeSection, setActiveSection] = useState('profile');
//   const [headlineCount, setHeadlineCount] = useState(0);

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       setHeadlineCount(profileData.headline.length);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     if (name === 'headline') {
//       setHeadlineCount(value.length);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const response = await fetch('/api/user/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(profileData)
//       });

//       if (response.ok) {
//         setSuccessMessage('Profile updated successfully!');
//         setTimeout(() => setSuccessMessage(''), 3000);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//     } catch (error) {
//       console.error('Error saving profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setProfileData({
//       firstName: 'Tasnia',
//       lastName: 'Tarannum',
//       headline: '',
//       biography: '',
//       language: 'en-us',
//       website: '',
//       facebook: '',
//       instagram: ''
//     });
//     setHeadlineCount(0);
//   };

//   const formatText = (command) => {
//     const textarea = document.getElementById('biography');
//     if (!textarea) return;
    
//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const selectedText = textarea.value.substring(start, end);
    
//     let formattedText = '';
//     if (command === 'bold') {
//       formattedText = `**${selectedText}**`;
//     } else if (command === 'italic') {
//       formattedText = `*${selectedText}*`;
//     }
    
//     const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
//     setProfileData(prev => ({ ...prev, biography: newValue }));
    
//     setTimeout(() => {
//       textarea.focus();
//       textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
//     }, 0);
//   };

//   const menuItems = [
//   { id: 'profile', label: 'Profile', link: '/edit' },
//   { id: 'photo', label: 'Photo', link: '/photo' }, // if this route exists
//   { id: 'close', label: 'Close account', danger: true, link: '/' }
// ];


//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto flex bg-white shadow-lg">
//         <aside className="w-64 bg-gray-50 border-r border-gray-200">
//           <div className="text-center p-8 border-b border-gray-200">
//             <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 cursor-pointer hover:scale-105 transition-transform">
//               TT
//             </div>
//             <div className="text-lg font-semibold text-gray-900">Tasnia Tarannum</div>
//           </div>
//           <nav className="p-0">
//             <ul className="space-y-0">
//               {menuItems.map((item) => (
//                 <li key={item.id} className="border-b border-gray-200">
//                   <button
//                     onClick={() => setActiveSection(item.id)}
//                     className={`w-full text-left px-6 py-4 font-medium transition-colors ${
//                       activeSection === item.id
//                         ? 'bg-purple-600 text-white'
//                         : item.danger
//                         ? 'text-red-600 hover:bg-red-50'
//                         : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//                     }`}
//                   >
//                     {item.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </aside>

//         <main className="flex-1 p-10">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Public profile</h1>
//             <p className="text-gray-600">Add information about yourself</p>
//           </div>

//           {successMessage && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
//               {successMessage}
//             </div>
//           )}

//           <div className="space-y-6">
//             <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Basics:</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={profileData.firstName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={profileData.lastName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Headline
//                 </label>
//                 <input
//                   type="text"
//                   name="headline"
//                   value={profileData.headline}
//                   onChange={handleInputChange}
//                   placeholder="Add a professional headline like, Instructor at Udemy or Architect"
//                   maxLength="60"
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
//                 />
//                 <div className="text-right text-sm text-gray-500 mt-1">
//                   <span className={headlineCount > 50 ? 'text-red-500' : ''}>{headlineCount}</span>/60
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Biography</h2>
//               <div className="mb-3">
//                 <div className="flex gap-2 p-3 bg-gray-50 rounded-t-lg border-2 border-gray-200 border-b-0">
//                   <button
//                     type="button"
//                     onClick={() => formatText('bold')}
//                     className="px-3 py-2 border border-gray-300 bg-white rounded font-bold hover:bg-gray-100 transition-colors"
//                     title="Bold"
//                   >
//                     B
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => formatText('italic')}
//                     className="px-3 py-2 border border-gray-300 bg-white rounded italic hover:bg-gray-100 transition-colors"
//                     title="Italic"
//                   >
//                     I
//                   </button>
//                 </div>
//                 <textarea
//                   id="biography"
//                   name="biography"
//                   value={profileData.biography}
//                   onChange={handleInputChange}
//                   placeholder="Tell us about yourself..."
//                   rows="6"
//                   className="w-full px-4 py-3 border-2 border-gray-200 border-t-0 rounded-b-lg focus:border-purple-500 focus:outline-none transition-colors resize-vertical"
//                 />
//               </div>
//               <p className="text-sm text-gray-500">Links and coupon codes are not permitted in this section.</p>
//             </div>

//             <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Language
//                 </label>
//                 <select
//                   name="language"
//                   value={profileData.language}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
//                 >
//                   <option value="en-us">English (US)</option>
//                   <option value="en-uk">English (UK)</option>
//                   <option value="es">Spanish</option>
//                   <option value="fr">French</option>
//                   <option value="de">German</option>
//                   <option value="it">Italian</option>
//                   <option value="pt">Portuguese</option>
//                   <option value="ja">Japanese</option>
//                   <option value="ko">Korean</option>
//                   <option value="zh">Chinese</option>
//                 </select>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Links:</h2>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Website
//                   </label>
//                   <input
//                     type="url"
//                     name="website"
//                     value={profileData.website}
//                     onChange={handleInputChange}
//                     placeholder="https://..."
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
//                   />
//                 </div>
                
//                 <div>
//                   <div className="flex">
//                     <div className="bg-gray-100 border-2 border-gray-200 border-r-0 px-4 py-3 rounded-l-lg text-gray-600 font-medium min-w-0 flex-shrink-0">
//                       facebook.com/
//                     </div>
//                     <input
//                       type="text"
//                       name="facebook"
//                       value={profileData.facebook}
//                       onChange={handleInputChange}
//                       placeholder="Username"
//                       className="flex-1 px-4 py-3 border-2 border-gray-200 border-l-0 rounded-r-lg focus:border-purple-500 focus:outline-none transition-colors"
//                     />
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">Input your Facebook username (e.g. johnsmith).</p>
//                 </div>
                
//                 <div>
//                   <div className="flex">
//                     <div className="bg-gray-100 border-2 border-gray-200 border-r-0 px-4 py-3 rounded-l-lg text-gray-600 font-medium min-w-0 flex-shrink-0">
//                       instagram.com/
//                     </div>
//                     <input
//                       type="text"
//                       name="instagram"
//                       value={profileData.instagram}
//                       onChange={handleInputChange}
//                       placeholder="Username"
//                       className="flex-1 px-4 py-3 border-2 border-gray-200 border-l-0 rounded-r-lg focus:border-purple-500 focus:outline-none transition-colors"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 hover:text-gray-900 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Saving...' : 'Save Profile'}
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation

const EditProfile = () => {
  const navigate = useNavigate(); // ✅ useNavigate hook

  const [profileData, setProfileData] = useState({
    firstName: 'Tasnia',
    lastName: 'Tarannum',
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

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setHeadlineCount(profileData.headline.length);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
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
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProfileData({
      firstName: 'Tasnia',
      lastName: 'Tarannum',
      headline: '',
      biography: '',
      language: 'en-us',
      website: '',
      facebook: '',
      instagram: ''
    });
    setHeadlineCount(0);
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

    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    setProfileData(prev => ({ ...prev, biography: newValue }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  // ✅ Menu items with link to home page for "Close account"
  const menuItems = [
    { id: 'profile', label: 'Profile', link: '/edit' },
    { id: 'photo', label: 'Photo', link: '/photo' },
    { id: 'close', label: 'Close account', danger: true, link: '/' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto flex bg-white shadow-lg">
        <aside className="w-64 bg-gray-50 border-r border-gray-200">
          <div className="text-center p-8 border-b border-gray-200">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 cursor-pointer hover:scale-105 transition-transform">
              TT
            </div>
            <div className="text-lg font-semibold text-gray-900">Tasnia Tarannum</div>
          </div>
          <nav className="p-0">
            <ul className="space-y-0">
              {menuItems.map((item) => (
                <li key={item.id} className="border-b border-gray-200">
                  <button
                    onClick={() => {
                      if (item.link) {
                        navigate(item.link); // ✅ Go to link if defined
                      } else {
                        setActiveSection(item.id); // fallback
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

        {/* Main Profile Editing Section */}
        <main className="flex-1 p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Public profile</h1>
            <p className="text-gray-600">Add information about yourself</p>
          </div>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
              {successMessage}
            </div>
          )}

          <div className="space-y-6">
             <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
               <h2 className="text-xl font-semibold text-gray-900 mb-6">Basics:</h2>
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
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Headline
                 </label>
                 <input
                   type="text"
                   name="headline"
                   value={profileData.headline}
                   onChange={handleInputChange}
                   placeholder="Add a professional headline like, Instructor at Udemy or Architect"
                   maxLength="60"
                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                 />
                 <div className="text-right text-sm text-gray-500 mt-1">
                   <span className={headlineCount > 50 ? 'text-red-500' : ''}>{headlineCount}</span>/60
                 </div>
               </div>
             </div>
             <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
               <h2 className="text-xl font-semibold text-gray-900 mb-6">Biography</h2>
               <div className="mb-3">
                 <div className="flex gap-2 p-3 bg-gray-50 rounded-t-lg border-2 border-gray-200 border-b-0">
                   <button
                     type="button"
                     onClick={() => formatText('bold')}
                     className="px-3 py-2 border border-gray-300 bg-white rounded font-bold hover:bg-gray-100 transition-colors"
                     title="Bold"
                   >
                     B
                   </button>
                   <button
                     type="button"
                     onClick={() => formatText('italic')}
                     className="px-3 py-2 border border-gray-300 bg-white rounded italic hover:bg-gray-100 transition-colors"
                     title="Italic"
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
               <p className="text-sm text-gray-500">Links and coupon codes are not permitted in this section.</p>
             </div>
             <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Language
                 </label>
                 <select
                   name="language"
                   value={profileData.language}
                   onChange={handleInputChange}
                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                 >
                   <option value="en-us">English (US)</option>
                   <option value="en-uk">English (UK)</option>
                   <option value="es">Spanish</option>
                   <option value="fr">French</option>
                   <option value="de">German</option>
                   <option value="it">Italian</option>
                   <option value="pt">Portuguese</option>
                   <option value="ja">Japanese</option>
                   <option value="ko">Korean</option>
                   <option value="zh">Chinese</option>
                 </select>
               </div>
             </div>
             <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
               <h2 className="text-xl font-semibold text-gray-900 mb-6">Links:</h2>
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Website
                   </label>
                   <input
                     type="url"
                     name="website"
                     value={profileData.website}
                     onChange={handleInputChange}
                     placeholder="https://..."
                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                   />
                 </div>              
                 <div>
                   <div className="flex">
                     <div className="bg-gray-100 border-2 border-gray-200 border-r-0 px-4 py-3 rounded-l-lg text-gray-600 font-medium min-w-0 flex-shrink-0">
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
                   <p className="text-sm text-gray-500 mt-1">Input your Facebook username (e.g. johnsmith).</p>
                 </div>              
                 <div>
                   <div className="flex">
                     <div className="bg-gray-100 border-2 border-gray-200 border-r-0 px-4 py-3 rounded-l-lg text-gray-600 font-medium min-w-0 flex-shrink-0">
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

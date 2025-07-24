// import React, { useRef } from "react";

// const CertificatePage = () => {
//   const certificateRef = useRef();
  
//   // Dummy data
//   const studentName = "Name Surname";
//   const achievementText = "LOREM IPSUM DOLOR SIT AMET, CONSECTETUR";
//   const description = "has successfully completed all academic and practical requirements of the course “[Course Title]”, offered by EduReach eLearning Platform.This certificate is awarded in recognition of the student's dedication, continuous learning, and successful demonstration of the knowledge and skills acquired throughout the program.";
//   const date = "July 24, 2025";

//   const downloadPDF = async () => {
//     // Create a canvas from the certificate
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
    
//     // Set canvas size
//     canvas.width = 1200;
//     canvas.height = 850;
    
//     // Fill background with white
//     ctx.fillStyle = '#ffffff';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
    
//     // Add navy blue diagonal sections
//     ctx.fillStyle = '#1e3a5f';
    
//     // Top left diagonal
//     ctx.beginPath();
//     ctx.moveTo(0, 0);
//     ctx.lineTo(400, 0);
//     ctx.lineTo(0, 300);
//     ctx.closePath();
//     ctx.fill();
    
//     // Bottom right diagonal
//     ctx.beginPath();
//     ctx.moveTo(canvas.width, canvas.height);
//     ctx.lineTo(canvas.width - 400, canvas.height);
//     ctx.lineTo(canvas.width, canvas.height - 300);
//     ctx.closePath();
//     ctx.fill();
    
//     // Add certificate content
//     ctx.fillStyle = '#1e3a5f';
//     ctx.font = 'bold 48px serif';
//     ctx.textAlign = 'center';
//     ctx.fillText('CERTIFICATE', canvas.width / 2, 120);
    
//     ctx.font = '24px serif';
//     ctx.fillText('OF ACHIEVEMENT', canvas.width / 2, 160);
    
//     ctx.font = '18px serif';
//     ctx.fillText('This certificate is proudly presented to', canvas.width / 2, 220);
    
//     // Name in script font style
//     ctx.font = 'italic 64px serif';
//     ctx.fillStyle = '#000000';
//     ctx.fillText(studentName, canvas.width / 2, 320);
    
//     // Achievement text
//     ctx.font = 'bold 20px sans-serif';
//     ctx.fillStyle = '#1e3a5f';
//     ctx.fillText(achievementText, canvas.width / 2, 380);
    
//     // Description text (wrapped)
//     ctx.font = '16px sans-serif';
//     ctx.fillStyle = '#666666';
//     const words = description.split(' ');
//     let line = '';
//     let y = 420;
//     const maxWidth = 800;
    
//     for (let n = 0; n < words.length; n++) {
//       const testLine = line + words[n] + ' ';
//       const metrics = ctx.measureText(testLine);
//       const testWidth = metrics.width;
//       if (testWidth > maxWidth && n > 0) {
//         ctx.fillText(line, canvas.width / 2, y);
//         line = words[n] + ' ';
//         y += 25;
//       } else {
//         line = testLine;
//       }
//     }
//     ctx.fillText(line, canvas.width / 2, y);
    
//     // Date and signature sections
//     ctx.font = '16px sans-serif';
//     ctx.fillStyle = '#1e3a5f';
//     ctx.textAlign = 'left';
//     ctx.fillText('DATE', 150, 750);
//     ctx.fillText('___________________', 150, 780);
    
//     ctx.textAlign = 'right';
//     ctx.fillText('SIGNATURE', canvas.width - 150, 750);
//     ctx.fillText('___________________', canvas.width - 150, 780);
    
//     // Convert canvas to blob and download
//     canvas.toBlob((blob) => {
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `certificate-${studentName.replace(/\s+/g, '-').toLowerCase()}.png`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-6">
//       {/* Certificate */}
//       <div 
//         ref={certificateRef}
//         className="w-full max-w-5xl bg-white shadow-2xl relative overflow-hidden"
//         style={{ aspectRatio: '1.41/1' }} // A4 ratio
//       >
//         {/* Navy blue diagonal sections */}
//         {/* <div className="absolute top-0 left-0 w-0 h-0 border-l-[300px] border-l-transparent border-t-[200px] border-t-[#1e3a5f]"></div>
//         <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[300px] border-r-transparent border-b-[200px] border-b-[#1e3a5f]"></div>
//          */}
//         {/* Award badge */}
//         <div className="absolute top-6 left-6">
//           <div className="w-20 h-20 bg-[#1e3a5f] rounded-full flex items-center justify-center relative">
//             <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
//               <div className="text-[#1e3a5f] text-2xl font-bold">👑</div>
//             </div>
//             {/* Ribbon tails */}
//             <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
//               <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#1e3a5f] mr-1 inline-block"></div>
//               <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#1e3a5f] inline-block"></div>
//             </div>
//           </div>
//         </div>
        
//         {/* Certificate content */}
//         <div className="flex flex-col items-center justify-center h-full px-16 py-12 text-center">
//           <div className="mb-8">
//             <h1 className="text-5xl font-bold text-[#1e3a5f] mb-2 tracking-wider">
//               CERTIFICATE
//             </h1>
//             <p className="text-xl text-[#1e3a5f] tracking-widest">
//               OF ACHIEVEMENT
//             </p>
//           </div>
          
//           <div className="w-24 h-px bg-[#1e3a5f] mb-6"></div>
          
//           <p className="text-lg text-gray-600 mb-6 italic">
//             This certificate is proudly presented to
//           </p>
          
//           <h2 className="text-6xl font-bold text-black mb-8 font-serif italic">
//             {studentName}
//           </h2>
          
//           <p className="text-xl font-semibold text-[#1e3a5f] mb-6 tracking-wide">
//             {achievementText}
//           </p>
          
//           <p className="text-gray-600 leading-relaxed max-w-3xl mb-12 text-base">
//             {description}
//           </p>
          
//           {/* Date and Signature */}
//           <div className="flex justify-between items-end w-full max-w-4xl mt-auto">
//             <div className="text-left">
//               <p className="text-sm font-semibold text-[#1e3a5f] mb-2 tracking-wider">
//                 DATE
//               </p>
//               <div className="border-b-2 border-[#1e3a5f] w-48 pb-1">
//                 <p className="text-gray-700">{date}</p>
//               </div>
//             </div>
            
//             <div className="text-right">
//               <p className="text-sm font-semibold text-[#1e3a5f] mb-2 tracking-wider">
//                 SIGNATURE
//               </p>
//               <div className="border-b-2 border-[#1e3a5f] w-48 pb-1">
//                 <p className="text-gray-700">Digital Certificate</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Download Button */}
//       <button
//         onClick={downloadPDF}
//         className="mt-8 bg-[#1e3a5f] hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
//       >
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//         </svg>
//         Download Certificate
//       </button>
//     </div>
//   );
// };

// export default CertificatePage;


import React, { useRef } from "react";
import back from "../assets/back.jpg"
import logo from "../assets/logo.png"
const CertificatePage = () => {
  const certificateRef = useRef();
  
  // Dummy data
  const achievementText = "Course Name";
  const studentName = "Name Surname";
  
  const description = "has successfully completed all academic and practical requirements of the course “[Course Title]”, offered by EduReach eLearning Platform.This certificate is awarded in recognition of the student's dedication, continuous learning, and successful demonstration of the knowledge and skills acquired throughout the program.";
  const date = "July 24, 2025";
  
  // Background image URL - you can replace this with your own image
  const backgroundImage = {back};

  const downloadPDF = async () => {
    // Create a canvas from the certificate
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 1200;
    canvas.height = 850;
    
    // Fill background with white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add background image if available
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = backgroundImage;
      });
      
      // Draw background image with opacity
      ctx.globalAlpha = 0.1;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;
    } catch (error) {
      console.log('Background image failed to load, using white background');
    }
    
    // Add navy blue diagonal sections
    ctx.fillStyle = '#1e3a5f';
    
    // Top left diagonal
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(400, 0);
    ctx.lineTo(0, 300);
    ctx.closePath();
    ctx.fill();
    
    // Bottom right diagonal
    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width - 400, canvas.height);
    ctx.lineTo(canvas.width, canvas.height - 300);
    ctx.closePath();
    ctx.fill();
    
    // Add certificate content
    ctx.fillStyle = '#1e3a5f';
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', canvas.width / 2, 120);
    
    ctx.font = '24px serif';
    ctx.fillText('OF ACHIEVEMENT', canvas.width / 2, 160);
    
    ctx.font = '18px serif';
    ctx.fillText('This certificate is proudly presented to', canvas.width / 2, 220);
    
    // Name in script font style
    ctx.font = 'italic 64px serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(studentName, canvas.width / 2, 320);
    
    // Achievement text
    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#1e3a5f';
    ctx.fillText(achievementText, canvas.width / 2, 380);
    
    // Description text (wrapped)
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#666666';
    const words = description.split(' ');
    let line = '';
    let y = 420;
    const maxWidth = 800;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[n] + ' ';
        y += 25;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);
    
    // Date and signature sections
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#1e3a5f';
    ctx.textAlign = 'left';
    ctx.fillText('DATE', 150, 750);
    ctx.fillText('___________________', 150, 780);
    
    ctx.textAlign = 'right';
    ctx.fillText('SIGNATURE', canvas.width - 150, 750);
    ctx.fillText('___________________', canvas.width - 150, 780);
    
    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificate-${studentName.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      {/* Certificate */}
      <div 
        ref={certificateRef}
        className="w-full max-w-5xl bg-white shadow-2xl relative overflow-hidden"
        style={{ 
          aspectRatio: '1.41/1',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-white/85"></div>
        {/* Navy blue diagonal sections */}
      
        {/* Award badge */}
        <div className="absolute top-6 left-6 z-20">
         <img src={logo} alt="Logo" className="w-20 h-20 mt [26px] mt-10 ml-20" />
        </div>
        
        {/* Certificate content */}
        <div className="flex flex-col items-center justify-center h-full px-16 py-12 text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-[#1e3a5f] mb-2 tracking-wider">
              CERTIFICATE
            </h1>
            <p className="text-xl text-[#1e3a5f] tracking-widest">
              OF ACHIEVEMENT
            </p>
          </div>
          
          <div className="w-24 h-px bg-[#1e3a5f] mb-6"></div>
          
          <p className="text-lg text-gray-600 mb-6 italic">
            This certificate is proudly presented to
          </p>
          
          <h2 className="text-6xl font-bold text-black mb-8 font-serif italic">
            {studentName}
          </h2>
          
          {/* <p className="text-xl font-semibold text-[#1e3a5f] mb-6 tracking-wide">
            {achievementText}
          </p>
           */}
          <p className="text-gray-600 leading-relaxed max-w-3xl mb-12 text-base">
            {description}
          </p>
          
          {/* Date and Signature */}
          <div className="flex justify-between items-end w-full max-w-4xl mt-auto">
            <div className="text-left">
              <p className="text-sm font-semibold text-[#1e3a5f] mb-2 tracking-wider">
                DATE
              </p>
              <div className="border-b-2 border-[#1e3a5f] w-48 pb-1">
                <p className="text-gray-700">{date}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-semibold text-[#1e3a5f] mb-2 tracking-wider">
                SIGNATURE
              </p>
              <div className="border-b-2 border-[#1e3a5f] w-48 pb-1">
                <p className="text-gray-700">Digital Certificate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Download Button */}
      <button
        onClick={downloadPDF}
        className="mt-8 bg-[#1e3a5f] hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download Certificate
      </button>
    </div>
  );
};

export default CertificatePage;
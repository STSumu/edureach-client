import React, { useRef } from "react";
import back from "../assets/back.jpg"
import logo from "../assets/logo.png"
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/AuthProvider";

const CertificatePage = () => {
  const certificateRef = useRef();
  const {courseId} = useParams();
  const {dbUser, courses} = useContext(authContext);
  const course = courses.find((c) => c.course_id === Number(courseId));
  
  const today = new Date();
  const date = today.toLocaleDateString();

  // Helper function to wrap text
  const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    return currentY + lineHeight; // Return next Y position
  };

  const downloadPDF = async () => {
    // Import jsPDF (you need to install it: npm install jspdf)
    const { jsPDF } = await import('jspdf');
    
    // Create a canvas from the certificate
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size (A4 landscape proportions)
    canvas.width = 1400;
    canvas.height = 990;
    
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
        img.src = back; // Fixed: use back directly, not {back}
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
    ctx.lineTo(450, 0);
    ctx.lineTo(0, 350);
    ctx.closePath();
    ctx.fill();
    
    // Bottom right diagonal
    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width - 450, canvas.height);
    ctx.lineTo(canvas.width, canvas.height - 350);
    ctx.closePath();
    ctx.fill();
    
    // Add logo
    try {
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        logoImg.onload = resolve;
        logoImg.onerror = reject;
        logoImg.src = logo;
      });
      
      // Draw logo in top left
      ctx.save();
      ctx.beginPath();
      ctx.arc(120, 120, 50, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(logoImg, 70, 70, 100, 100);
      ctx.restore();
    } catch (error) {
      console.log('Logo failed to load');
    }
    
    // Certificate content
    ctx.fillStyle = '#1e3a5f';
    ctx.font = 'bold 60px serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', canvas.width / 2, 180);
    
    ctx.font = '28px serif';
    ctx.fillText('OF ACHIEVEMENT', canvas.width / 2, 220);
    
    // Decorative line
    ctx.fillStyle = '#1e3a5f';
    ctx.fillRect(canvas.width / 2 - 60, 240, 120, 3);
    
    ctx.font = '22px serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('This certificate is proudly presented to', canvas.width / 2, 290);
    
    // Student name
    ctx.font = 'italic 72px serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(dbUser.user_name, canvas.width / 2, 380);
    
    // Description text with proper wrapping
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#666666';
    ctx.textAlign = 'center';
    
    const descriptionText = `has successfully completed all academic and practical requirements of the course "${course.course_name}", offered by EduReach eLearning Platform. This certificate is awarded in recognition of the student's dedication, continuous learning, and successful demonstration of the knowledge and skills acquired throughout the program.`;
    
    // Wrap the description text
    wrapText(ctx, descriptionText, canvas.width / 2, 450, 1000, 35);
    
    // Date and signature sections
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#1e3a5f';
    ctx.textAlign = 'left';
    
    // Date section
    ctx.fillText('DATE', 200, 750);
    ctx.strokeStyle = '#1e3a5f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 780);
    ctx.lineTo(450, 780);
    ctx.stroke();
    
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText(date, 200, 800);
    
    // Signature section
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#1e3a5f';
    ctx.textAlign = 'right';
    ctx.fillText('SIGNATURE', canvas.width - 200, 750);
    
    ctx.beginPath();
    ctx.moveTo(canvas.width - 450, 780);
    ctx.lineTo(canvas.width - 200, 780);
    ctx.stroke();
    
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText(course.instructor, canvas.width - 200, 800);
    
    // Convert canvas to PDF
    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF in landscape orientation
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    
    // Add image to PDF (fit to page)
    pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
    
    // Save the PDF
    pdf.save(`certificate-${dbUser.user_name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  };

  return (
    <div className="-z-1 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-6 " >
      {/* Certificate */}
      <div 
        ref={certificateRef}
        className="w-full max-w-5xl bg-white shadow-2xl relative overflow-hidden"
        style={{ 
          aspectRatio: '1.41/1',
          backgroundImage: `url(${back})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-white/85"></div>
        
        {/* Award badge */}
        <div className="absolute top-6 left-6 z-20">
         <img src={logo} alt="Logo" className="w-20 h-20 rounded-full mt [26px] mt-2 lg:mt-16 ml-10 lg:ml-30 " />
        </div>
        
        {/* Certificate content */}
        <div className="flex flex-col items-center justify-center h-full px-16 py-12 text-center relative z-10">
          <div className="mt-8">
            <h1 className="text-5xl font-bold text-[#1e3a5f] my-2 tracking-wider">
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
            {dbUser.user_name}
          </h2>
          
          <p className="text-gray-600 leading-relaxed max-w-3xl mb-12 text-base">
            has successfully completed all academic and practical requirements of the course <strong>{course.course_name}</strong>, offered by <span className='text-xl font-bold'>EduReach</span> eLearning Platform. This certificate is awarded in recognition of the student's dedication, continuous learning, and successful demonstration of the knowledge and skills acquired throughout the program.
          </p>
          
          {/* Date and Signature */}
          <div className="flex justify-between items-end w-full max-w-4xl mt-auto mb-4">
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
                <p className="text-gray-700 italic">{course.instructor}</p>
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
        Download Certificate as PDF
      </button>
    </div>
  );
};

export default CertificatePage;
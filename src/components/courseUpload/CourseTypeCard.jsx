import React from "react";

const CourseTypeCard = ({ type, icon, title, description, selectedType, onSelect }) => {
  return (
    <div
  className={`rounded-xl p-8 w-72 border-2 cursor-pointer relative transition-all
    ${selectedType === type 
      ? 'bg-gradient-to-br from-[#B14E0F] to-[#8A2E00] text-white border-[#B14E0F]'
      : 'bg-[#fff5f0] border-[#f4d4c3] hover:border-[#B14E0F] hover:shadow-xl'
    }`}
  onClick={() => onSelect(type)}
>
  <div className={`text-4xl mb-4 ${selectedType === type ? 'text-white' : 'text-[#B14E0F]'}`}>{icon}</div>
  <h3 className="text-xl font-semibold mb-3">{title}</h3>
  <p className={`text-sm leading-relaxed ${selectedType === type ? 'text-white/90' : 'text-slate-500'}`}>
    {description}
  </p>
</div>

  );
};

export default CourseTypeCard;

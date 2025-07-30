import React from "react";

const CourseTypeCard = ({ type, icon, title, description, selectedType, onSelect }) => {
  return (
    <div
      className={`course-card ${selectedType === type ? "selected" : ""}`}
      onClick={() => onSelect(type)}
    >
      <style>{`
        .course-card {
          background: #fff5f0;
          border: 2px solid #f4d4c3;
          border-radius: 15px;
          padding: 30px 25px;
          width: 280px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .course-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .course-card:hover::before {
          left: 100%;
        }
        .course-card:hover {
          transform: translateY(-5px);
          border-color: #B14E0F;
          box-shadow: 0 15px 30px rgba(177, 78, 15, 0.3);
        }
        .course-card.selected {
          border-color: #B14E0F;
          background: linear-gradient(135deg, #B14E0F, #8A2E00);
          color: white;
        }
        .course-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          color: #B14E0F;
        }
        .course-card.selected .course-icon {
          color: white;
        }
        .course-title {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 15px;
          color: #2c3e50;
        }
        .course-card.selected .course-title {
          color: white;
        }
        .course-description {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.5;
        }
        .course-card.selected .course-description {
          color: rgba(255, 255, 255, 0.9);
        }
      `}</style>

      <div className="course-icon">{icon}</div>
      <h3 className="course-title">{title}</h3>
      <p className="course-description">{description}</p>
    </div>
  );
};

export default CourseTypeCard;

import React from "react";

const Rating = ({ rating }) => {
  return (
    <div className="rating rating-xs rating-half flex items-center">
      <input type="radio" name="rating-fixed" className="rating-hidden" />
      {Array.from({ length: 10 }, (_, i) => {
        const half = (i + 1) * 0.5;
        const isLeft = i % 2 === 0;

        return (
          <input
            key={i}
            type="radio"
            name="rating-fixed"
            className={`mask mask-star-2 ${
              isLeft ? "mask-half-1" : "mask-half-2"
            } bg-yellow-400`}
            aria-label={`${half} star`}
            defaultChecked={Math.abs(half - rating) < 0.25}
            readOnly
          />
        );
      })}
    </div>
  );
};

export default Rating;

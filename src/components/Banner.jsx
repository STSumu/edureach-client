import React from 'react';
import { FaSearch } from 'react-icons/fa';
const Banner = () => {
  return (
    <div className="flex flex-col justify-center items-start h-[80vh] px-10 bg-gray-100">
      <h1 className="text-8xl font-extrabold text-left leading-tight text-gray-800">
        Better to <br />
        Think For<br />
        <span className="outline-text">
          Learning
          <span className="inline-block animate-spin text-orange-500 text-2xl relative -top-6">
            ⭐
          </span>
        </span>
      </h1>

      <p className="mt-6 text-lg text-black max-w-xl font-serif">
       With over 11000+ customers worldwide, millions of users<br/> are using EduReach
      </p>
      <div className="mt-8 max-w-md relative">
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black-400" />
        <input
          type="text"
          placeholder="Search your course"
          className="w-110 border-4  pl-10 pr-4 py-2 border border-black-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      
    <div className="avatar-group -space-x-6 mt-8">
  <div className="avatar">
    <div className="w-12">
      <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
    </div>
  </div>
  <div className="avatar">
    <div className="w-12">
      <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
    </div>
  </div>
  <div className="avatar">
    <div className="w-12">
      <img src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp" />
    </div>
  </div>
  <div className="avatar">
    <div className="w-12">
      <img src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp" />
    </div>
  </div>
</div>


    </div>
  );
};

export default Banner;

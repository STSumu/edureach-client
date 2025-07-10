import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useLocation } from 'react-router-dom';

const Banner = () => {
  const location=useLocation();
  const display=location?.pathname === '/' ? ' flex flex-col lg:flex-row ' : 'hidden';
  return (
    <div className={`hero w-full lg:min-h-screen container mx-auto lg:justify-between px-5 md:px-6 ${display}`}>
  <div className="flex-col w-full lg:w-1/2 pt-30  md:pt-40 lg:pt-0 pl-2 lg:pl-20">
    
      <h1 className="text-3xl md:text-5xl font-bold libre-baskerville">Big dreams start with <br></br> small steps.<br></br> Start learning now</h1>
      <p className="py-6 font-semibold">
        Learn the skills that move you forward. Whether it's coding, communication, or creative thinking, our expert-led courses help you build real knowledge at your pace. No pressure, just progress—anytime, anywhere.
      </p>
      <button className="btn bg-[#A75A44] text-bold text-white text-lg rounded-lg ">Get Started</button>  
  </div>
  <div className="-mask-linear-60 mask-linear-from-80% mask-linear-to-100% w-full md:w-1/2">
    <DotLottieReact
      src='/hero3.lottie'
      loop
      autoplay
    /></div>
</div>
  );
};

export default Banner;

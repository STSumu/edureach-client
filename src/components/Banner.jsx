import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Banner = () => {
  
  return (
    <div className="hero flex flex-col md:flex-row min-h-screen container md:justify-between px-5">
  <div className="flex-col lg:flex-row w-full md:w-1/2 pt-25 md:pt-0">
    <div className='pl-2 md:pl-20'>
      <h1 className="text-5xl font-bold libre-baskerville">Big dreams start with <br></br> small steps.<br></br> Start learning now</h1>
      <p className="py-6 font-semibold">
        Learn the skills that move you forward. Whether it's coding, communication, or creative thinking, our expert-led courses help you build real knowledge at your pace. No pressure, just progress—anytime, anywhere.
      </p>
      <button className="btn bg-[#A75A44] text-bold text-white text-lg rounded-lg ">Get Started</button>
    </div>  
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

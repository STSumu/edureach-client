import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Error = () => {
  return (
     
      <div className='w-full flex flex-col justify-center items-center h-screen'>
        <DotLottieReact
      src="/Error.lottie"
      loop
      autoplay
    />
        <h1 className='text-4xl text-[#e47331] font-semibold mb-5'>Page Not Found</h1>
        <Link
            className="btn text-white shadow-none border-0 bg-[#e47331]"
            to="/"
          >
            Go Home
          </Link>
      </div>
  );
};

export default Error;
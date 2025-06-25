import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animation from '../assets/Animation.lottie'

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center py-80 md:py-5 lg:py-0'>
    <DotLottieReact
      src={animation}
      loop
      autoplay
    />
    </div>
    
  );
};
export default Loading;
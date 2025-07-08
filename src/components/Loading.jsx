import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center py-80 md:py-5 lg:py-0'>
    <DotLottieReact
      src='/loading.lottie'
      loop
      autoplay
    />
    </div>
    
  );
};
export default Loading;
import Lottie from "lottie-react";
import loadingAnim from "../assets/Loading Dots In Yellow.json"; // adjust path

const Loading = () => (
  <div className='flex flex-col items-center justify-center py-80 md:py-5 lg:py-0'>
    <Lottie animationData={loadingAnim} loop autoplay />
  </div>
);

export default Loading;
import Lottie from "lottie-react";
import loadingAnim from "../assets/Loading Dots In Yellow.json"; // adjust path
import { useLocation } from "react-router-dom";

const Loading = () => {
  const location=useLocation();
  console.log(location);
  return (
  <div className='flex flex-col items-center justify-center py-80 md:py-5 lg:py-0'>
    <Lottie animationData={loadingAnim} loop autoplay />
  </div>
)};

export default Loading;
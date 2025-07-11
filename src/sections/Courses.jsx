import React, { useContext } from 'react';
import Course from '../components/Course';
import { authContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';


const Courses = () => {
    const { courses } = useContext(authContext);
    return (
        <div className='py-25 flex flex-col justify-center items-center'>
            <div className='max-w-1/2 justify-center flex flex-col mb-5 md:mb-15'>
                <h1 className='border-l-4 border-l-[#a75a44] pl-2 text-xl md:text-4xl font-bold'>Our Courses</h1>
                <p className='text-sm font-semibold'>Explore Our courses here</p>
            </div>
            <Swiper className='w-full'
                modules={[Autoplay, Navigation, Pagination, Scrollbar]}
                spaceBetween={50}
                slidesPerView={3}
                loop={true}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
            >
                {
                    courses.slice(0, 6).map((course, idx) =>
                        <SwiperSlide key={idx} >
                            <div className="pt-6 pb-6"> {/* simulate vertical offset */}
                                <Course course={course} />
                            </div>
                        </SwiperSlide>)
                }

            </Swiper>
            <div className='flex justify-end w-full px-4'>
                <Link to='/courses' className='font-bold mt-5 text-2xl text-[#a75a44]'>See more <FaArrowRight className='inline'></FaArrowRight></Link>
            </div>
        </div>
    );
};

export default Courses;
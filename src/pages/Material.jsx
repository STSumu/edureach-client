import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';
import Loading from '../components/Loading';
import CourseContent from '../components/CourseContent';

const Material = () => {
    const {baseUrl}=useContext(authContext);
    const[material,setMaterial]=useState();
    const params=useParams();
    useEffect(() => {
        fetch(`${baseUrl}/materials/mat/${params?.materialId}`)
          .then(res => res.json())
          .then(data => setMaterial(data));
        
      }, [])
      if (!material) return <Loading></Loading>;
      const {url,title}=material[0];
      const getEmbedUrl = (url) => {
    if (!url) return "";

    try {
      if (url.includes("youtu.be")) {
        const videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }

      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      return url;
    } catch {
      return url;
    }
  };

  const embedUrl = getEmbedUrl(url);
    return (
<div>
            <div className='flex items-center flex-col justify-center p-8 mt-20'>
            <div className="p-5 border-amber-400 border-1 video-container">
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <h1 className='text-2xl'>{title}</h1>
        </div>
        <div>
            {/* <CourseContent></CourseContent> */}
        </div>
</div>

    );
};

export default Material;
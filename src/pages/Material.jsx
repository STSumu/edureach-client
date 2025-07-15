import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';
import Loading from '../components/Loading';
import CourseContent from '../components/CourseContent';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Discussion from '../components/Discussion';

const Material = () => {
  const { baseUrl,dbUser } = useContext(authContext);
  const [material, setMaterial] = useState();
  const params = useParams();
  const [buttonState,setbuttonState]=useState(false);
  useEffect(() => {
    fetch(`${baseUrl}/materials/mat/${params?.matId}?stdId=${dbUser.user_id}`)
      .then(res => res.json())
      .then(data => setMaterial(data));

  }, [params?.matId, baseUrl])
  
  
  if (!material) return <Loading></Loading>;
  const { url,course_id,islocked } = material[0];
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
    <div className="mt-17 md:mt-10">
      {
        islocked ? 
        <div className="container mx-auto p-6 text-center">
      <h2 className="text-xl font-bold mb-4">Content Locked</h2>
      <p>You cannot watch this video until you unlock it by completing previous materials or enrolling.</p>
    </div>
        :
        <div>
        <iframe
          className="w-screen h-[75vh] z-0"
          width="560"
          height="315"
          src={embedUrl}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      }
      <div className='container mx-auto px-4 md:px-8'>
        <Tabs>
          <TabList className="flex flex-wrap gap-0 border-b border-gray-200 items-center justify-center">
            {["Course Content", "Overview", "Discussion", "Quiz"].map((title, idx) => (
              <Tab
                key={idx}
                className="cursor-pointer py-2 px-4 border border-gray-300 bg-gray-100 hover:bg-[#f0b086] react-tabs__tab"
                selectedClassName="!bg-[#F2EEEC] border-b-0 !border-[#B14E0F] font-semibold text-[#B14E0F]"
              >
                {title}
              </Tab>

            ))}
          </TabList>

          <TabPanel >
            <div className='my-10 max-w-3/4 mx-auto'>
              <h2 className="text-xl font-semibold mb-2">Course Content</h2>
              <CourseContent course_id={params?.courseId} setbuttonState={setbuttonState}></CourseContent>
            </div>
          </TabPanel>
          <TabPanel >
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p>This section contains a general overview of the course.</p>
          </TabPanel>
          {/* <TabPanel>
            <h2 className="text-xl font-semibold mb-2">Discussion</h2>
            <p>Students and instructors can ask/answer questions here.</p>
          </TabPanel> */}
           <TabPanel>
            <Discussion courseId={course_id} currentUser={dbUser.user_id} />
          </TabPanel>
          <TabPanel>
            <h2 className="text-xl font-semibold mb-2">Quiz</h2>
            <p>All available quizzes will show up in this section.</p>
          </TabPanel>
        </Tabs>
      </div>
      <div className='container mx-auto flex justify-end px-4 md:px-50'>
        <button className={`btn ${!buttonState ? `disabled bg-amber-900/50` : `Enabled bg-amber-200`}`}>Complete</button>
      </div>
    </div>

  );
};

export default Material;
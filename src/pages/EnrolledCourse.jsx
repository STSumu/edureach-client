import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';
import Loading from '../components/Loading';
import CourseContent from '../components/course/CourseContent';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Discussion from '../components/discussion/Discussion';
import QuizPage from '../components/quiz/QuizPage';
import ChooseQuizPage from '../components/quiz/ChooseQuiz';
import Material from './Material';

const EnrolledCourse = () => {
  const { baseUrl,dbUser } = useContext(authContext);
  const [material, setMaterial] = useState();
  const params = useParams();
  const [buttonState,setbuttonState]=useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    if (params.matId === '-1') return;

    fetch(`${baseUrl}/materials/mat/${params?.matId}?stdId=${dbUser.user_id}`)
      .then(res => res.json())
      .then(data => setMaterial(data));

  }, [params?.matId, baseUrl])
  
  const handleComplete=()=>{
     navigate(`/enrolled/certificate/${params?.courseId}`);
  }
  useEffect(()=>{
    fetch(`${baseUrl}/enroll/status/${dbUser.user_id}?courseId=${params?.courseId}`)
    .then(res=>res.json())
    .then(data=>{
      if(data.status==='completed'){
        setbuttonState(true);
      }
    })
  },[])
  
  const isMatIdInvalid =params.matId === '-1';

  const hasMaterial = material && material.length > 0;

  const { url, islocked } = hasMaterial ? material[0] : { url: null, islocked: false };

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
   <div className="">
      {/* Upper video section */}
      {isMatIdInvalid ? (
        <div className='h-[300px] flex justify-center items-center'>
           <Link><p className='text-4xl font-bold'>Start Learning</p></Link>
        </div>
      ) : (
        islocked ? (
          <div className="container mx-auto p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Content Locked</h2>
            <p>You cannot watch this video until you unlock it by completing previous materials or enrolling.</p>
          </div>
        ) : (
          <div>
            <iframe
              className="w-full h-[75vh] z-0"
              width="560"
              height="315"
              src={embedUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )
      )}
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
              <Material course_id={params?.courseId}></Material>
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
            <Discussion courseId={params?.courseId} currentUser={dbUser.user_id} />
          </TabPanel>
          <TabPanel>
           <ChooseQuizPage courseId={params?.courseId}></ChooseQuizPage>
          </TabPanel>
        </Tabs>
      </div>
      <div className='container mx-auto flex justify-end px-4 md:px-30 lg:px-45 py-10'>
        <button className={`btn ${!buttonState ? `disabled bg-amber-900/50` : `Enabled bg-amber-200`}`} onClick={handleComplete}>Complete</button>
      </div>
    </div>

  );
};

export default EnrolledCourse;
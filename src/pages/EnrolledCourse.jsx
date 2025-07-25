import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Discussion from '../components/discussion/Discussion';
import ChooseQuizPage from '../components/quiz/ChooseQuiz';
import Material from './Material';

const EnrolledCourse = () => {
  const { baseUrl, dbUser, getTokenHeader } = useContext(authContext);
  const [material, setMaterial] = useState([]);
  const [buttonState, setButtonState] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  // Fetch material by matId
  useEffect(() => {
    const fetchMaterial = async () => {
      if (!params.matId || params.matId === '-1') return;
      const headers = await getTokenHeader();

      try {
        const res = await fetch(`${baseUrl}/materials/mat/${params.matId}`, { headers });
        const data = await res.json();
        setMaterial(data);
      } catch (err) {
        console.error("Failed to fetch material:", err);
      }
    };

    fetchMaterial();
  }, [params.matId, baseUrl, getTokenHeader]);

  
  useEffect(() => {
    const checkCompletion = async () => {
      if (!dbUser?.user_id || !params?.courseId) return;
      const headers = await getTokenHeader();

      try {
        const res = await fetch(`${baseUrl}/enroll/status/${params.courseId}`, { headers });
        const data = await res.json();
        setButtonState(data.status === 'completed');
      } catch (err) {
        console.error("Failed to check course status:", err);
      }
    };

    checkCompletion();
  }, [dbUser?.user_id, params?.courseId, getTokenHeader, baseUrl]);

  const handleComplete = () => {
    navigate(`/enrolled/certificate/${params.courseId}`);
  };

  const isMatIdInvalid = params.matId === '-1';
  const hasMaterial = material && material.length > 0;

  const { url, islocked } = hasMaterial ? material[0] : { url: null, islocked: false };

  // Convert YouTube or direct video links into embed URLs
  const getEmbedUrl = (url) => {
    if (!url) return "";
    try {
      if (url.includes("youtu.be")) {
        const videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch {
      return url;
    }
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div>
      {/* Video Section */}
      {isMatIdInvalid ? (
        <div className="h-[300px] flex justify-center items-center">
          <Link><p className="text-4xl font-bold">Start Learning</p></Link>
        </div>
      ) : islocked ? (
        <div className="container mx-auto p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Content Locked</h2>
          <p>You must complete previous materials to unlock this video.</p>
        </div>
      ) : (
        <iframe
          className="w-full h-[75vh] z-0"
          width="560"
          height="315"
          src={embedUrl}
          title="Course Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      {/* Tabs Section */}
      <div className="container mx-auto px-4 md:px-8">
        <Tabs>
          <TabList className="flex flex-wrap gap-0 border-b border-gray-200 items-center justify-center">
            {["Course Content", "Overview", "Discussion", "Quiz"].map((title, idx) => (
              <Tab
                key={idx}
                className="cursor-pointer py-2 px-4 border border-gray-300 bg-gray-100 hover:bg-[#f0b086]"
                selectedClassName="!bg-[#F2EEEC] border-b-0 !border-[#B14E0F] font-semibold text-[#B14E0F]"
              >
                {title}
              </Tab>
            ))}
          </TabList>

          <TabPanel>
            <div className="my-10 max-w-3/4 mx-auto">
              <h2 className="text-xl font-semibold mb-2">Course Content</h2>
              <Material course_id={params.courseId} />
            </div>
          </TabPanel>

          <TabPanel>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p>This section contains a general overview of the course.</p>
          </TabPanel>

          <TabPanel>
            <Discussion courseId={params.courseId} currentUser={dbUser?.user_id} />
          </TabPanel>

          <TabPanel>
            <ChooseQuizPage courseId={params.courseId} />
          </TabPanel>
        </Tabs>
      </div>

      {/* Completion Button */}
      <div className="container mx-auto flex justify-end px-4 md:px-30 lg:px-45 py-10">
        <button
          disabled={!buttonState}
          className={`btn ${buttonState ? 'bg-amber-200 hover:bg-amber-300' : 'bg-amber-900/50 cursor-not-allowed'}`}
          onClick={handleComplete}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default EnrolledCourse;

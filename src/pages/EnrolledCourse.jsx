import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
const EnrolledCourse = () => {
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
  const url = `https://youtu.be/CgCVZdcKcqY?si=h8mZv5JLS7w2pBNh`;
  const embedUrl = getEmbedUrl(url);
  return (
    <div className="mt-17 md:mt-10">
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
      <div>
        {/* <Tabs>
          <TabList>
            <Tab>Course Content</Tab>
            <Tab>Overview</Tab>
            <Tab>Discussion</Tab>
            <Tab>Quiz</Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs> */}
         <Tabs>
          <TabList className="flex flex-wrap gap-0 border-b border-gray-200">
            {["Course Content", "Overview", "Discussion", "Quiz"].map((title, idx) => (
              <Tab
                key={idx}
                className="cursor-pointer py-2 px-4  border border-gray-300 bg-gray-100 hover:bg-[#f0b086] react-tabs__tab"
                selectedClassName="bg-white border-b-0 border-gray-300 font-semibold text-blue-600"
              >
                {title}
              </Tab>
            ))}
          </TabList>

          <TabPanel className="p-6 border border-t-0 border-gray-300  bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Course Content</h2>
            <p>Video lectures, slides, notes and additional materials will be listed here.</p>
          </TabPanel>
          <TabPanel className="p-6 border border-t-0 border-gray-300 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p>This section contains a general overview of the course.</p>
          </TabPanel>
          <TabPanel className="p-6 border border-t-0 border-gray-300 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Discussion</h2>
            <p>Students and instructors can ask/answer questions here.</p>
          </TabPanel>
          <TabPanel className="p-6 border border-t-0 border-gray-300 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Quiz</h2>
            <p>All available quizzes will show up in this section.</p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default EnrolledCourse;

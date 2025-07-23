import React, { useState, useEffect, useContext } from 'react';
import ThreadList from './ThreadList';
import ThreadView from './ThreadView';
import CreateThread from './CreateThread';
import { authContext } from '../../context/AuthProvider';
import Loading from '../Loading';

const Discussion = ({ courseId, currentUser }) => {
    const {baseUrl}=useContext(authContext);
  const [activeView, setActiveView] = useState('threads'); 
  const [selectedThread, setSelectedThread] = useState(null);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreads();
  }, [courseId]);

  const fetchThreads = async () => {
    try {
      const response = await fetch(`${baseUrl}/discussion/threads/${courseId}`);
      const data = await response.json();
      console.log(data);
      setThreads(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching threads:', error);
      setLoading(false);
    }
  };

  // const handleThreadClick = (thread) => {
  //   setSelectedThread(thread);
  //   setActiveView('thread');
  // };

  // const handleCreateThread = () => {
  //   setActiveView('create');
  // };

  // const handleBackToThreads = () => {
  //   setActiveView('threads');
  //   setSelectedThread(null);
  //   fetchThreads(); // Refresh threads
  // };

  // const handleThreadCreated = () => {
  //   setActiveView('threads');
  //   fetchThreads();
  // };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className='border-black h-45 border-2'>
      {
        threads.map((thread)=>
          <div className='flex flex-col'>
            <div>
          <h2>{thread.created_by}</h2>
      </div>
      <div>
          <h3>{thread.title}</h3>
      </div>
      <div>
          <p>last updated at{thread.updated_at}</p>
      </div>
            </div>
        )
      }
      
      {/* {activeView === 'threads' && (
        <ThreadList 
          threads={threads}
          onThreadClick={handleThreadClick}
          onCreateThread={handleCreateThread}
        />
      )}
      
      {activeView === 'thread' && (
        <ThreadView 
          thread={selectedThread}
          currentUser={currentUser}
          onBack={handleBackToThreads}
        />
      )}
      {/* {quizes.map((quiz)=<Quiz quizId={quiz_id}></Quiz>)} */}
      {/* {activeView === 'create' && (
        <CreateThread 
          courseId={courseId}
          currentUser={currentUser}
          onBack={handleBackToThreads}
          onThreadCreated={handleThreadCreated}
        />
      )}*/} 
    </div> 
)};

export default Discussion;
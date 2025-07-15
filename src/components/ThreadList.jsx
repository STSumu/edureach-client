import React from 'react';

const ThreadList = ({ threads, onThreadClick, onCreateThread }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  console.log(threads);

  return (
    <div className="thread-list">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Discussions</h2>
        <button
          onClick={onCreateThread}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start New Discussion
        </button>
      </div>

      {threads.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No discussions yet. Be the first to start a discussion!
        </div>
      ) : (
        <div className="space-y-4">
          {threads.map((thread) => (
            <div
              key={thread.thread_id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onThreadClick(thread)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{thread.title}</h3>
                  <div className="text-sm text-gray-600 mb-2">
                    Started by {thread.creator_name} on {formatDate(thread.created_at)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">{thread.post_count} replies</span>
                    <span>Last activity: {formatDate(thread.last_activity)}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    thread.status === 'open' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {thread.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadList;
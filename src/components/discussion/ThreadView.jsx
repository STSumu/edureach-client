import React, { useState, useEffect } from 'react';
import PostItem from '../PostItem';
import ReplyForm from '../ReplyForm';

const ThreadView = ({threadId}) => {
    console.log(threadId);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [thread.thread_id]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/discussion/posts/${thread.thread_id}`);
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleReplySubmit = async (content, parentPostId = null) => {
    try {
      const response = await fetch('/discussion/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId: thread.thread_id,
          userId: currentUser.user_id,
          content,
          parentPostId
        })
      });

      if (response.ok) {
        fetchPosts(); // Refresh posts
      }
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading posts...</div>;
  }

  return (
    <div className="thread-view">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Discussions
        </button>
        <h1 className="text-2xl font-bold mb-2">{thread.title}</h1>
        <div className="text-gray-600 text-sm">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {posts.map((post) => (
          <PostItem 
            key={post.post_id} 
            post={post} 
            currentUser={currentUser}
            onReply={handleReplySubmit}
          />
        ))}
      </div>

      <ReplyForm 
        onSubmit={handleReplySubmit}
        placeholder="Add your reply to this discussion..."
      />
    </div>
  );
};

export default ThreadView;
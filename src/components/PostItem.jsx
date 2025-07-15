import React, { useState } from 'react';

const PostItem = ({ post, currentUser, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(replyContent, post.post_id);
      setReplyContent('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className={`post-item border rounded-lg p-4 ${
      post.parent_post_id ? 'ml-8 border-l-4 border-l-blue-200' : ''
    }`}>
      <div className="flex items-start space-x-3">
        <img
          src={post.profile_pic || '/default-avatar.png'}
          alt={post.user_name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold">{post.user_name}</span>
            <span className={`px-2 py-1 rounded text-xs ${
              post.role === 'teacher' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {post.role}
            </span>
            <span className="text-gray-500 text-sm">
              {formatDate(post.created_at)}
            </span>
          </div>
          <div className="text-gray-800 mb-3">
            {post.content}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-4 ml-13">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            className="w-full p-3 border rounded-lg resize-none"
            rows="3"
            required
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reply
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostItem;
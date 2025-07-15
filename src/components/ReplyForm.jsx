import React, { useState } from 'react';

const ReplyForm = ({ onSubmit, placeholder = "Write your reply..." }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 border rounded-lg resize-none"
        rows="4"
        required
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Reply
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;
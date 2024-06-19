import React, { useState } from 'react';
import './addPostForm.css';
import ConfirmModal from '../bai6/ConfirmModal';

interface AddPostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (newPost: { title: string, image: string, content: string }) => void;
  existingPosts: { title: string }[];
}

const AddPostForm: React.FC<AddPostFormProps> = ({ isOpen, onClose, onAddPost, existingPosts }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [showClearModal, setShowClearModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClear = () => {
    setTitle('');
    setImage('');
    setContent('');
    setShowClearModal(false);
  };

  const handlePublish = () => {
    // Validate data
    if (!title || !image || !content) {
      setError('All fields are required.');
      return;
    }

    // Check for duplicate title
    const isDuplicate = existingPosts.some(post => post.title === title);
    if (isDuplicate) {
      setError('Title already exists.');
      return;
    }

    // If validation passes, call the onAddPost callback
    onAddPost({ title, image, content });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="form-overlay">
      <div className="form-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Add New Post</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <div className="form-actions">
          <button onClick={() => setShowClearModal(true)}>Clear</button>
          <button onClick={handlePublish}>Publish</button>
        </div>
      </div>
      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClear}
        title="Confirm Clear"
        message="Are you sure you want to clear all input fields?"
      />
    </div>
  );
};

export default AddPostForm;
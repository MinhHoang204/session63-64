import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./updatePostForm.css"
interface UpdatePostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  post: Post | null;
}

const UpdatePostForm: React.FC<UpdatePostFormProps> = ({ isOpen, onClose, onUpdate, post }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setContent(post.content);
    }
  }, [post]);

  const validate = () => {
    if (!title || !image || !content) {
      setError('Tên bài viết, hình ảnh và nội dung không được để trống');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    axios.put(`http://localhost:3000/posts/${post?.id}`, { title, image, content, date: post?.date, status: post?.status })
      .then(() => {
        onUpdate();
        onClose();
      })
      .catch(err => console.log(err));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cập Nhật Bài Viết</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Tên bài viết"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Hình ảnh"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <textarea
          placeholder="Nội dung"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={onClose}>Hủy</button>
          <button onClick={handleSubmit}>Cập nhật</button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePostForm;
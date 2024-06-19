import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../loading/Loading';
import ConfirmModal from '../bai6/ConfirmModal';
import AddPostForm from '../Bai7/AddPostForm';
import './post.css';

interface Post {
  id: number;
  title: string;
  image: string;
  date: string;
  status: boolean;
}

const Post: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [addFormOpen, setAddFormOpen] = useState<boolean>(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    setIsLoading(true);
    axios.get('http://localhost:3000/posts')
      .then(response => {
        setTimeout(() => {
          setIsLoading(false);
          setPosts(response.data);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleBlockClick = (post: Post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleConfirmBlock = () => {
    if (selectedPost) {
      axios.patch(`http://localhost:3000/posts/${selectedPost.id}`, {
        status: !selectedPost.status
      })
        .then(response => {
          setModalOpen(false);
          getPosts();
        })
        .catch(err => console.log(err));
    }
  };

  const handleAddPost = (newPost: { title: string, image: string, content: string }) => {
    const date = new Date().toISOString().split('T')[0];
    const newPostData = {
      ...newPost,
      date,
      status: true
    };
    axios.post('http://localhost:3000/posts', newPostData)
      .then(response => {
        getPosts();
        setAddFormOpen(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="post-container">
      <h1>Posts</h1>
      <div className="controls">
        <input type="text" placeholder="Search content" />
        <select name="" id="">
          <option value="">Filter posts</option>
        </select>
        <button onClick={() => setAddFormOpen(true)}>Add Post</button>
      </div>
      {isLoading ? <Loading /> : (
        <div className="post-table-wrapper">
          <table className="posts-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Image</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.slice(0, 5).map((post, index) => (
                <tr key={post.id}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>
                    <img src={post.image} alt={post.title} className="post-image" />
                  </td>
                  <td>{post.date}</td>
                  <td>
                    {post.status ? <button className="status-button active">Published</button> : <button className="status-button inactive">Unpublished</button>}
                  </td>
                  <td>
                    <button className="btn block" onClick={() => handleBlockClick(post)}>Block</button>
                    <button className="btn edit">Edit</button>
                    <button className="btn delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length > 5 && (
            <div className="scroll-indicator">
              Scroll to see more
            </div>
          )}
        </div>
      )}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmBlock}
        title="Confirm Block"
        message={`Are you sure you want to ${selectedPost?.status ? 'unpublish' : 'publish'} this post?`}
      />
      <AddPostForm
        isOpen={addFormOpen}
        onClose={() => setAddFormOpen(false)}
        onAddPost={handleAddPost}
        existingPosts={posts.map(post => ({ title: post.title }))}
      />
    </div>
  );
};

export default Post;
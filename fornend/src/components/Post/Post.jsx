import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const getPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/posts/posts/${id}`);
      setPost(response.data.data); // Assuming data is nested in response.data.data
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  };

  const deletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/posts/delete/${id}`);
      navigate("/AllPost");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);

  return (
    <div className="container mx-auto p-6"> 
      {post ? (
        <div className="p-4 border rounded-lg shadow-lg bg-white">
          <div className="flex justify-center items-center border-solid border-2 border-black p-2">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-auto h-auto object-cover rounded-lg mt-4 mx-auto"
              />
            )}
          </div>
          <h1 className="text-2xl font-bold mb-2 text-center">{post.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: post.content }}></p>

          {userData._id === post.author && (
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => navigate(`/AddPost/${post._id}`, { state: { post } })}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default Post;

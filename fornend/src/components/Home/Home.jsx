import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Home = () => {
  // const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (status) {
      fetchPosts();
    }
  }, [status]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/posts/posts');
      setPosts(response.data.data); // Set 'data' array from response
      console.log(posts);
      
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  if (!status) {
    return (
      <div className='h-96 w-auto flex justify-center items-center bg-gray-400 '>
      <p className='font-serif text-3xl'>Please login to view posts.</p>
    </div>
    )
   
    
  }

  return (
    <div className="mx-auto p-6">
    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Posts</h1>
    <div className="border-t-2 border-gray-300 mb-6"></div>
  
    {posts.length > 0 ? (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            to={`/post/${post._id}`}
            key={post._id}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out bg-white"
          >
            {post.image && (
              <div className="w-full h-48 overflow-hidden flex justify-center items-center bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{post.title}</h2>
              <p className="text-gray-600 text-sm">{post.excerpt || 'Read more...'}</p>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 text-xl mt-10">Loading</p>
    )}
  </div>
  
  );
};

export default Home;

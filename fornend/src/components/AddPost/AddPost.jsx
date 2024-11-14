import React, { useState,useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useRef } from "react";
import { useParams, useLocation } from "react-router-dom";


const AddPost = () => {
  const {id} = useParams()
  const Location = useLocation()
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const quillRef = useRef(null); 
  
  useEffect(() => {
    if (id && Location.state?.post) {
      const { title, content, image } = Location.state.post;
      setTitle(title);
      setcontent(content);
      setImage(image);
    }
  }, [id, Location.state]);


  const modules = {
    toolbar: [
      [{ 'font': [] }],                 // Font family
      [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] }],  // Headers
      ['bold', 'italic', 'underline'],   // Bold, Italic, Underline
      [{ 'color': [] }, { 'background': [] }],  // Text and background color
      [{ 'align': [] }],                 // Align text
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
      ['clean'],                         // Remove formatting
    ]
  };

  // Access the token directly from Redux store
  const token = useSelector((state) => state.auth.token);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    try {
      const endpoint = id
    ? `https://daily-blog-backend.vercel.app/api/v1/posts/updatePost/${id}`  // Correct format
    : "https://daily-blog-backend.vercel.app/api/v1/posts/post";

      const method = id ? "put" : "post";

      const response = await axios[method](endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage(id ? "Post updated successfully!" : "Post created successfully!");
    } catch (err) {
      console.error("Error creating/updating post:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to create/update post");
    }
  };

return (
  
  <div className="max-w-4xl my-9 mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
    {error && <p className="text-red-500">{error}</p>}
    {successMessage && <p className="text-green-500">{successMessage}</p>}

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">Content</label>
        <ReactQuill
        ref={quillRef}
          value={content}
          onChange={setcontent} // ReactQuill passes the content directly
          modules={modules}
          placeholder="Start typing..."
          className="h-60" // Set vertical height of the editor
        />
        <p className="hidden">Editor Content:</p>
        <div className="hidden" dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mt-14 mb-4">Image</label>
        <input
          type="file"
          onChange={handleFileChange}
          required
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
      >
        Create Post
      </button>
    </form>
  </div>
)
};

export default AddPost

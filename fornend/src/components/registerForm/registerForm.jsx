import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // State to hold error message

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (username.trim() === '' || password.trim() === '') {
      setError("Username and password are required");
      return; // Exit the function if validation fails
    }

    try {
      const response = await axios.post('https://daily-blog-backend.vercel.app/api/v1/users/register', { username, password });
      setMessage(response.data.message); // Success message
      setError(''); // Clear any previous errors
      setUsername('');
      setPassword('');
    } catch (error) {
      // Set error message if registration fails
      setError(error.response?.data?.message || 'Registration failed');
      setMessage(''); // Clear any previous success message
    }
  };

  return (
    
    <div className='flex justify-center items-center md:min-h-screen bg-gray-300'>
      <div className='bg-white p-8 rounded-lg my-12 w-full max-w-md '>
      <h2 className='text-center text-4xl font-bold text-gray-700 mb-6'>Register</h2>
      
      <form className='space-y-6' onSubmit={handleSubmit}>
        <div>
          <label className=' text-gray-600 font-semibold mb-2 block'>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className=' w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          />
        </div>
        <div>
          <label className=' text-gray-600 font-semibold mb-2 block'>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             className=' w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          />
        </div>
        <button className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700" type="submit">Register</button>
      </form>
      
      {/* Display success message in green */}
      {message && <h1 style={{ color: 'green' }}>{message}</h1>}
      
      {/* Display error message in red */}
      {error && <h1 style={{ color: 'red' }}>{error}</h1>}
    
      </div>
     </div>
  );
}

export default Register;

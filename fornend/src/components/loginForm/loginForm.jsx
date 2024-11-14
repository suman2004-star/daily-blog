import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate} from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Message,setMessage] = useState('')
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('https://daily-blog-backend.vercel.app/api/v1/users/login', { username, password });
      const { token, user,message } = response.data;
      console.log("User data:", user);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(login({ token, userData: user }));
      
      navigate("/")
      
      
      setMessage(message)
      setUsername('');
      setPassword('');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-center text-4xl font-bold text-gray-700 mb-6">Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Username Field */}
        <div>
          <label className="block text-gray-600 font-semibold mb-2">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
  
        {/* Password Field */}
        <div>
          <label className="block text-gray-600 font-semibold mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </form>
  
      {Message && <p className="text-center text-green-500 mt-4">{Message}</p>}
    </div>
  </div>
  );
}

export default Login;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';  // Import the store you configured
import './index.css';
import Register from "./components/registerForm/registerForm";
import Login from "./components/loginForm/loginForm";
import AddPost from './components/AddPost/AddPost';
import Home from './components/Home/Home';
import Post from './components/Post/Post';



import Layout from './components/Layout/Layout';
import { Route,RouterProvider,createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"login",
        element:<Login/>
      }, 
      {
        path:"AddPost",
        element:<AddPost/>
      },
      {
        path:"post/:id",
        element:<Post/>
      },
      {
        path:"AddPost/:id",
        element:<AddPost/>
      },
      {
        path:"AllPost",
        element:<Home/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  
);

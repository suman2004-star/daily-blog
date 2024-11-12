import React, { useState } from 'react';
import LogoutBtn from './logoutBtn';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
// import { FaBars, FaTimes } from 'react-icons/fa';


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Register', slug: '/register', active: !authStatus },
    { name: 'All Posts', slug: '/AllPost', active: authStatus },
    { name: 'Add Post', slug: '/AddPost', active: authStatus },
  ];

  return (
    <header className="bg-gray-800 text-white shadow py-4 font-semibold">
      <nav className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="mr-4">
          <NavLink to="/">
            <h1 className="text-2xl font-bold">My Blog</h1>
          </NavLink>
        </div>

        {/* Mobile menu toggle button */}
        <button
          className="text-2xl lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation items */}
        <ul
          className={`lg:flex lg:items-center lg:space-x-6 lg:static absolute bg-gray-800 w-full left-0 lg:w-auto lg:bg-transparent z-10 lg:z-auto transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'top-16' : '-top-full'
          }`}
        >
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name} className="my-2 lg:my-0">
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `block px-6 py-2 rounded-full duration-200 ${
                        isActive
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-500'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
          )}
          {authStatus && (
            <li className="my-2 lg:my-0">
              <LogoutBtn onClick={() => setIsMobileMenuOpen(false)} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

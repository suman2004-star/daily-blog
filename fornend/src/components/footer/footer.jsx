import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -m-4 text-center lg:text-left">
          {/* Company Section */}
          <div className="w-full p-4 sm:w-1/2 lg:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">Careers</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">Blog</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-400">Press</Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="w-full p-4 sm:w-1/2 lg:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">Help Center</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">Contact Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-400">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="w-full p-4 sm:w-1/2 lg:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">Terms & Conditions</Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">Disclaimer</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-400">Licensing</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="w-full p-4 sm:w-1/2 lg:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="mb-2">1234 Street Name, City, Country</p>
            <p className="mb-2">Phone: (123) 456-7890</p>
            <p>Email: <a href="mailto:support@example.com" className="hover:text-gray-400">support@example.com</a></p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500">&copy; 2023 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

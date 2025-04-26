// src/layouts/PublicLayout.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-linear-to-r from-gray-700 via-rose-500 to-orange-400 font-sans">
      {/* Public Navbar */}
      <nav className="bg-linear-to-r from-green-200 via-emerald-400 to-teal-600 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-500">AuthApp</h1>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? 'text-white font-semibold underline'
                    : 'text-gray-700 hover:text-white'
                }
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                     ? 'text-white font-semibold underline'
                    : 'text-gray-700 hover:text-white'
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      <main className="container mx-auto py-10 px-4">{children}</main>
    </div>
  );
};

export default PublicLayout;

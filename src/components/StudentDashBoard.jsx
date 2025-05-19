import React, { useEffect, useState } from 'react';
import API from '../../apiConnecter';
import Spinner from './Spinner';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem('token')?.trim();
      try {
        const res = await API.get('/student', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(res.data);
      } catch (err) {
        console.error('Error fetching student data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
    const storedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedMode);
  }, []);

  // Update HTML tag with dark class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  const { message, title, email, surname } = student || {};
  const initials = title?.split(' ').map((n) => n[0]).join('').toUpperCase() || '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-lg font-semibold">Student Dashboard</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button onClick={() => setIsSidebarOpen((prev) => !prev)}>
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'block' : 'hidden'
          } md:block w-64 h-screen shadow-lg p-4 fixed md:static z-10 bg-white dark:bg-gray-800 text-black dark:text-white`}
        >
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
            <div className="font-semibold text-lg">{`${title} ${surname}`}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{email}</div>
            <span className="mt-2 inline-block text-xs text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-300 px-2 py-1 rounded">
              Student
            </span>
          </div>

          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-4">
            <li className="hover:text-green-500 cursor-pointer">Overview</li>
            <li className="hover:text-green-500 cursor-pointer">Courses</li>
            <li className="hover:text-green-500 cursor-pointer">Assignments</li>
            <li className="hover:text-green-500 cursor-pointer">Profile</li>
          </ul>

          <div className="mt-8">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="w-full px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 ml-0 md:ml-64">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">{message} 🎓</h1>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Enrolled Courses"
              value="You have 4 active courses."
            />
            <DashboardCard
              title="Upcoming Assignments"
              value="2 assignments due this week."
            />
            <DashboardCard
              title="Notifications"
              value="You have 3 new messages."
            />
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-white dark:bg-gray-700 text-black dark:text-white">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{value}</p>
  </div>
);

export default StudentDashboard;

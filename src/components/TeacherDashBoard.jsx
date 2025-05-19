import React, { useEffect, useState } from 'react';
import API from '../../apiConnecter';
import Spinner from './Spinner';
import { FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherData = async () => {
      const token = localStorage.getItem('token')?.trim();
      try {
        const res = await API.get('/teacher', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeacher(res.data);
      } catch (err) {
        console.error('Error fetching teacher data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  if (loading) return <Spinner />;
  if (!teacher) return <div className="p-6 text-lg text-red-500">Unable to load teacher data.</div>;

  const {
    message,
    title,
    surname,
    email,
    totalCourses = 5,
    pendingReviews = 7,
    unreadMessages = 4,
  } = teacher;

  const initials = title?.split(' ').map((n) => n[0]).join('').toUpperCase() || '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-lg font-semibold">Teacher Dashboard</h1>
        <div className="flex items-center gap-4">
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
          } md:block w-64 h-screen bg-white shadow-lg p-4 fixed md:static z-10 text-black`}
        >
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
            <div className="font-semibold text-lg">{`${title} ${surname}`}</div>
            <div className="text-sm text-gray-500">{email}</div>
            <span className="mt-2 inline-block text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
              Teacher
            </span>
          </div>

          <h2 className="text-xl font-bold mb-4">Navigation</h2>
          <ul className="space-y-4">
            <li className="hover:text-purple-400 cursor-pointer">Overview</li>
            <li className="hover:text-purple-400 cursor-pointer">My Courses</li>
            <li className="hover:text-purple-400 cursor-pointer">Submissions</li>
            <li className="hover:text-purple-400 cursor-pointer">Messages</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 ml-0 md:ml-64">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">{message} 👩‍🏫</h1>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Courses You Teach"
              value={`${totalCourses} active courses`}
            />
            <DashboardCard
              title="Pending Reviews"
              value={`${pendingReviews} assignments to review`}
            />
            <DashboardCard
              title="Messages"
              value={`${unreadMessages} new messages`}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-white text-black">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{value}</p>
  </div>
);

export default TeacherDashboard;

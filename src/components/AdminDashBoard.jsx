import React, { useEffect, useState } from 'react';
import API from '../../apiConnecter';
import Spinner from './Spinner';
import { FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('token')?.trim();
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await API.get('/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmin(res.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  if (loading) return <Spinner />;
  if (!admin) return <div className="p-6 text-lg text-red-500">Unable to load admin data.</div>;

  const {
    message = 'Welcome to the Admin Dashboard',
    title = 'Admin',
    surname = '',
    email = '',
    totalUsers = 0,
    activeCourses = 0,
    newReports = 0,
  } = admin;

  const initials = title?.split(' ').map((n) => n[0]).join('').toUpperCase() || '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <button onClick={() => setIsSidebarOpen((prev) => !prev)}>
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'block' : 'hidden'
          } md:block w-64 h-screen bg-white shadow-lg p-4 fixed md:static z-10 text-black`}
        >
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
            <div className="font-semibold text-lg">{`${title} ${surname}`}</div>
            <div className="text-sm text-gray-500">{email}</div>
            <span className="mt-2 inline-block text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
              Admin
            </span>
          </div>

          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <ul className="space-y-4">
            <li className="hover:text-blue-500 cursor-pointer">Overview</li>
            <li className="hover:text-blue-500 cursor-pointer">Manage Users</li>
            <li className="hover:text-blue-500 cursor-pointer">Manage Courses</li>
            <li className="hover:text-blue-500 cursor-pointer">Reports</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 ml-0 md:ml-64">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">{message} 👨‍💼</h1>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Total Users" value={`${totalUsers} active users`} />
            <DashboardCard title="Active Courses" value={`${activeCourses} active courses`} />
            <DashboardCard title="New Reports" value={`${newReports} new reports`} />
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

export default AdminDashboard;

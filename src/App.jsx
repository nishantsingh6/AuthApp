import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentDashBoard from './components/StudentDashBoard';
import TeacherDashboard from './components/TeacherDashBoard';
import AdminDashboard from './components/AdminDashBoard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './components/PublicLayout';
import ErrorPage from './components/ErrorPage';

const App = () => {
  return (
    <Routes>
      {/* Public Pages with Navbar */}
      <Route
        path="/signup"
        element={
          <PublicLayout>
            <Signup />
          </PublicLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />
      <Route
        path="/"
        element={
          <PublicLayout>
            <Signup />
          </PublicLayout>
        }
      />

      {/* ERROR ROUTE */}
      <Route path='*' element={<ErrorPage/>}/>

      {/* Protected Routes without public navbar */}
      <Route element={<ProtectedRoute />}>
        <Route path="/student" element={<StudentDashBoard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;

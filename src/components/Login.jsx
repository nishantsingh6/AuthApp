import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import API from '../../apiConnecter';
import { toast } from 'react-toastify';

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await API.post('/login', data);
      // Store token and role
      localStorage.setItem('token', res.data.token);
      const userRole = res.data.user.role;

      // Navigate to the correct dashboard based on the role
      if (userRole === 'Student') {
        navigate('/student');
        toast.success("Logged in SuccessFully");
      } else if (userRole === 'Admin') {
        navigate('/admin');
        toast.success("Logged in SuccessFully");
      } else if (userRole === 'Teacher') {
        navigate('/teacher');
        toast.success("Logged in SuccessFully");
      }
    } catch (err) {
      console.error(err.response?.data?.message || 'Login error');
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-gray-700 via-rose-500 to-orange-400">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-gray-950 font-bold text-2xl mb-6">Login</h2>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email address is required', maxLength: 100 })}
            placeholder="Enter your email"
            className="mt-1 block w-full px-4 py-2 border rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mt-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required', maxLength: 100 })}
            placeholder="Enter your Password"
            className="mt-1 block border border-gray-700 text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex flex-col mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>

          <button
            type="button"
            className="mt-2 bg-blue-300 text-black px-4 py-2 rounded-md hover:bg-blue-400"
            onClick={() => navigate('/signup')}
          >
            Create New Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

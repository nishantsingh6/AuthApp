import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import API from '../../apiConnecter';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try{
     const res = await API.post("/signup", data);
 
    //  localStorage.getItem('token', res.data.token);
     navigate('/login');
    }catch(err){
      console.error(err.response?.data?.message || 'Login error');
      toast.error(err.response?.data?.message || 'Login failed');

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-gray-700 via-rose-500 to-orange-400">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

        {/* Name */}
        <div className="mb-4 flex space-x-4">
  {/* First Name Field */}
  <div className="flex-1">
    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
      First Name
    </label>
    <input
      id="title"
      {...register('title', {
        required: 'First Name is required',
        maxLength: {
          value: 100,
          message: 'Name cannot exceed 100 characters'
        }
      })}
      placeholder="FirstName"
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
    />
    {errors.title && (
      <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
    )}
  </div>

  {/* Last Name Field */}
  <div className="flex-1">
    <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
      Last Name
    </label>
    <input
      type="text"
      id="surname"
      {...register('surname', {
        required: 'Last Name is required',
        maxLength: {
          value: 50,
          message: 'Name cannot exceed 50 characters'
        }
      })}
      placeholder="LastName"
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
    />
    {errors.surname && (
      <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>
    )}
  </div>
</div>


        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email Address is required'
            })}
            placeholder="Enter your email"
            aria-invalid={errors.email ? 'true' : 'false'}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password with toggle */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              maxLength: {
                value: 100,
                message: 'Password cannot exceed 100 characters'
              }
            })}
            placeholder="Enter your password"
            className="mt-1 block w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-[38px] right-3 text-sm text-blue-600 hover:underline focus:outline-none"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Role */}
        <div className="mb-6">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Select Role
          </label>
          <select
            id="role"
            {...register('role', { required: 'Role is required' })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">-- Select Role --</option>
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>

        <div className='mb-4'>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 text-sm"
        >
          Sign Up
        </button>
        </div>
      <p className='flex justify-center text-sm font-medium'>Already have an account?
        <button onClick={() => {navigate("/login")}} className='text-blue-500 cursor-pointer'>Login</button>
      </p>
      </form>
    </div>
  );
};

export default Signup;

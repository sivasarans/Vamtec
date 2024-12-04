import React from 'react';

const Dashboard = () => {
    return (

<div className="bg-gray-100 flex items-center justify-center min-h-screen">
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
    <form>
      <div className="mb-4">
        <label  htmlFor="UserId" className="block text-sm font-medium text-gray-700 mb-2">User Id</label>
        <input type="text" id="UserId" name="UserId" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          placeholder="Enter your UserId" required />
      </div>
      <div className="mb-4">
        <label  htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <input type="password" id="password" name="password" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          placeholder="Enter your password" required />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <input type="checkbox" id="remember" name="remember" className="mr-2" />
          <label  htmlFor="remember" className="text-sm text-gray-600">Remember Me</label>
        </div>
        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
      </div>
      <button type="submit" 
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200">
        Login
      </button>
    </form>
    <p className="text-sm text-gray-600 text-center mt-4">
      Don't have an account? 
      <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
    </p>
  </div>
  </div>








);
};


export default Dashboard;

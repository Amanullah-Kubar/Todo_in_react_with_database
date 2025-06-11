import { Link } from 'react-router-dom';
import supabase from '../config/supabase';

export default function Root() {
    console.log(supabase);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">📝 To-Do App</h1>
        <p className="text-gray-600 mb-8">Welcome! Please log in or sign up to continue.</p>
        
        <div className="flex flex-col space-y-4">
          <Link
            to="/login"
            className="bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

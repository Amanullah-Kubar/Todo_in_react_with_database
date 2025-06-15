import { Link } from 'react-router-dom';

export default function Root() {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl text-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-6">📝 To-Do App</h1>
        <p className="text-gray-100 mb-8">Welcome! Please log in or sign up to continue.</p>
        
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

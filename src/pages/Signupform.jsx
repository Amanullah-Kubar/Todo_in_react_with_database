import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../config/supabase';




export default function SignupForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handlesubmit = async(e) => {
        e.preventDefault();

            if (username === '' || password === '') {
                alert('Please fill in all fields');
                return;
            }

            console.log('Username:', username);
            console.log('Password:', password);
            const {data, error} = await supabase
            .from('users')
            .insert([{username, password }]);

            if (error) {
                console.error('Error signing up:', error.message);
            }
            else {
                console.log('User signed up successfully:', data);
            }
      
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🔐 Sign Up</h2>

                <form className="space-y-4" onSubmit={handlesubmit}>
                    {/* Username */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            placeholder="Choose a username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                    >
                        Create Account
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center text-gray-500 mt-6">
                    Already registered? <Link to="/login" className="text-indigo-600 hover:underline"> Log in </Link>
                </p>
            </div>
        </div>
    );
}

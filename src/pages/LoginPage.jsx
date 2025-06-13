import React, { useState } from 'react';
import supabase from '../config/supabase';
import { Link, useNavigate } from 'react-router-dom';
export default function Loginpage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();


    const onsubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('password', password)

        if (error) {
            return { success: false, messege: "Invalid username or password" };
        }
        if (data) {
            console.log('User logged in successfully:', data);
            const id = data[0].id;
            setId(id);
            localStorage.setItem('userId', id);
            // Optionally redirect to todo page 
            navigate('/todo');
            return { success: true, data: data };
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🔐 Login</h2>

                <form className="space-y-4" onSubmit={onsubmit}>
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            placeholder="username"
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
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
                        Log In
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center text-gray-500 mt-6">
                    Don’t have an account? <Link to='/signup' className="text-indigo-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

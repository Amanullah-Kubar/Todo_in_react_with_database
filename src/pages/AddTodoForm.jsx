import { useState } from 'react';
import supabase from '../config/supabase';

export default function AddTodoForm({ onTodoAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isCompleted: false,
    time: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          ...formData,
          user_id: localStorage.getItem('userId'),
        },
      ]);

    setLoading(false);
    if (error) {
      console.error('Error adding todo:', error.message);
    } else {
      setFormData({
        title: '',
        description: '',
        isCompleted: false,
        time: '',
      });
      onTodoAdded();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="bg-purple-500 shadow-xl rounded-2xl p-6 w-full max-w-md">

        <form
          onSubmit={handleSubmit}
          className="bg-transparent p-4 rounded-lg shadow mb-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter description"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isCompleted"
              checked={formData.isCompleted}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600"
            />
            <label htmlFor="isCompleted" className="text-gray-100">
              Mark as completed
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">Due Date & Time</label>
            <input
              type="datetime-local"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-700 text-white px-6 py-2 rounded-md hover:bg-indigo-900 transition"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Todo'}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}


// componrnt to edit the existing todo

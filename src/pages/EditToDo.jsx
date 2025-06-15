import React, { useState } from 'react';
import supabase from '../config/supabase';

export default function EditTodoForm({ todo, onTodoUpdated }) {
  if (!todo) return null; // Or show a loading spinner or message

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted || false);
  const [time, setTime] = useState(todo.time || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("todos")
      .update({ title, description })
      .eq("id", todo.id);

    if (!error) {
      onTodoUpdated(); // Call parent to refresh and exit edit mode
    } else {
      console.error("Error updating todo:", error.message);
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        placeholder="Description (optional)"
      />
        <div className="flex items-center space-x-2">
            <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
            className="h-4 w-4"
            />
            <label className="text-sm">Completed</label>
        </div>
        <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        placeholder="Time (optional)"
        />

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          onClick={() => onTodoUpdated()} // cancel and exit
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
// import { useState } from 'react';
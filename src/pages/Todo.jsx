import { useEffect, useState } from "react";
import supabase from "../config/supabase";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const fetcchTodos = async () => {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .eq('user_id', localStorage.getItem('userId'));
        if (error) {
            console.error('Error fetching todos:', error.message);
        } else {
            setTodos(data);
        }
    }
    useEffect(() => {
        fetcchTodos();
    }, []);
    onchange = async (e) => {
        // const {data, error} = await supabase
        // .from('todos')
        // .update()
    }

    const handlecross = async (e) => {

    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📝 My To-Do List</h1>

                {/* Input Section */}
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="search"
                        className="flex-1 px-4 py-2 rounded-l-md border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                </div>

                {/* Task List */}
                <ul className="space-y-3">
                    {/* Example Task */}
                    {
                        todos.length > 0 ? todos.map((todo) => (
                            <li key={todo.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" className="h-4 w-4 text-indigo-600" checked={todo.status} onChange={() => onchange(todo.id)} />
                                    <span className={`text-gray-700 ${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>
                                </div>
                                <button className="text-red-500 hover:text-red-700" onClick={handlecross}>✕</button>
                            </li>
                        )) : <p className="text-gray-500 text-center">No tasks available</p>
                    }

                    {/* Add more <li> items dynamically */}
                </ul>

                <div className="flex justify-center mt-6">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                        Add
                    </button>
                </div>


                {/* Footer */}
                <div className="text-sm text-gray-500 text-center mt-6">
                    <span>Built with 💙 by Amanullah</span>
                </div>
            </div>
        </div>
    );
}

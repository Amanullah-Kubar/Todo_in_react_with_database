import { useEffect, useState } from "react";
import supabase from "../config/supabase";
import { Navigate, useNavigate } from "react-router-dom";
import EditTodoForm from "./EditToDo";

export default function Todo() {

    const navigate = useNavigate();
    const [editing, setEditing] = useState(null);
    const [todos, setTodos] = useState([]);
    const [toSearch, setToSearch] = useState('');
    const [filteredTodos, setFilteredTodos] = useState([]);

    const fetcchTodos = async () => {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .eq('user_id', localStorage.getItem('userId'))
            .order('time', { ascending: true });
        if (error) {
            console.error('Error fetching todos:', error.message);
        } else {
            setTodos(data);
        }
    }
    useEffect(() => {
        fetcchTodos();
    }, []);

    const onSearch = (e) => {
        setFilteredTodos(
            todos.filter(todo => todo.title.toLowerCase().includes(toSearch.toLowerCase()))
        );
    }

    const onchangeic = async (id) => {
        const targ = todos.find(todo => todo.id === id);
        const { data, error } = await supabase
            .from('todos')
            .update({ 'isCompleted': !targ.isCompleted })
            .eq('id', targ.id);
        if (error) {
            console.error('Error updating todo:', error.message);
        }
        else {
            setTodos(todos.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
        }
    }

    const handlecross = async (e) => {
        const { data, errot } = await supabase
            .from('todos')
            .delete()
            .eq('id', e);
        if (errot) {
            console.error('Error deleting todo:', errot.message);
        } else {
            setTodos(todos.filter(todo => todo.id !== e));
        }
    }

    const handleEdit = async (e) => {
        const todoToEdit = todos.find(todo => todo.id === e);
        setEditing(todoToEdit);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
                <div className="flex">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📝 My To-Do List</h1>
                    <div className="ml-auto">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            onClick={() => {
                                setTodos([]);
                                localStorage.setItem('userId', null);
                                navigate('/login');
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {editing !== null && editing !== undefined ? (
                    <EditTodoForm
                        todo={editing}
                        onTodoUpdated={() => {
                            fetcchTodos();
                            setEditing(null);
                        }}
                    />
                ) : toSearch === '' ? (
                    <>
                        {/* Input/Search Bar */}
                        <div className="flex mb-4">
                            <input
                                type="text"
                                value={toSearch}
                                onChange={(e) => {
                                    setToSearch(e.target.value)
                                    onSearch();
                                }
                                }
                                placeholder="search"
                                className="flex-1 px-4 py-2 rounded-l-md border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        {/* Task List */}
                        <ul className="space-y-3">
                            {todos.length > 0 ? (
                                todos.map((todo) => (
                                    <li
                                        key={todo.id}
                                        className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-sm"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600"
                                                checked={todo.isCompleted}
                                                onChange={() => onchangeic(todo.id)}
                                            />
                                            <span
                                                className={`text-gray-700 ${todo.isCompleted ? 'line-through' : ''}`}
                                            >
                                                {todo.title}
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="text-blue-500 hover:text-blue-700"
                                                onClick={() => handleEdit(todo.id)}
                                            >
                                                📝
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handlecross(todo.id)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">No tasks available</p>
                            )}
                        </ul>

                        {/* Add Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                                onClick={() => navigate('/addtodo')}
                            >
                                Add
                            </button>
                        </div>
                    </>
                ) : filteredTodos.length === 0 && toSearch !== ''?(
                    <p className="text-gray-500 text-center">No ${toSearch} tasks available</p>
                ): (
                    <>
                        <div className="flex mb-4">
                            <input
                                type="text"
                                value={toSearch}
                                onChange={(e) => {
                                    setToSearch(e.target.value)
                                    onSearch(e.target.value);
                                }}
                                placeholder="search"
                                className="flex-1 px-4 py-2 rounded-l-md border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <ul className="space-y-3">
                            {filteredTodos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-sm"
                                >
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600"
                                            checked={todo.isCompleted}
                                            onChange={() => onchangeic(todo.id)}
                                        />
                                        <span
                                            className={`text-gray-700 ${todo.isCompleted ? 'line-through' : ''}`}
                                        >
                                            {todo.title}
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleEdit(todo.id)}
                                        >
                                            📝
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handlecross(todo.id)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )
                }
            </div>
        </div>
    );

}

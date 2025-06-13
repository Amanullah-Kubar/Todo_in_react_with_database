import { useState } from 'react'

import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
  Navigate,
} from 'react-router-dom';
import Todo from './pages/Todo'
import Loginpage from './pages/LoginPage'
import SignupForm from './pages/Signupform'
import Root from './pages/Root';
import AddTodoForm from './pages/AddTodoForm';

function App() {
  const userId = localStorage.getItem('userId')
  return (

    <>

      <Router>
        <Routes>
          <Route path="/" element={(userId === null) ? <Navigate to='/login' /> : <Root />} />
          <Route path="/todo" element={(userId === null) ? <Navigate to='/login' /> : <Todo />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/addtodo" element={<AddTodoForm/>}/>
        </Routes>
      </Router>


    </>
  )
}

export default App

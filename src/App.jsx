import { useState } from 'react'

import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Todo from './pages/Todo'
import Loginpage from './pages/LoginPage'
import SignupForm from './pages/Signupform'
import Root from './pages/Root';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App

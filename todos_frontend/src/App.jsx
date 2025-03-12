import { useState } from 'react'
// import { addTodo, removeTodo, updateTodo } from './features/todo/todo.Slice.js'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import AddTodo from './components/AddTodo.jsx'
import Todos from './components/Todos.jsx'
function App() {


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-10">
        {/* Header */}
      <div className="text-white text-center p-6 border-4 border-b-blue-400 border-t-green-400 border-r-red-400 border-l-yellow-400 rounded-lg shadow-lg mb-8">
        <h1 className="text-2xl font-serif font-medium">
          This todo-app is created using React Redux Toolkit
        </h1>
      </div>
        
        <AddTodo/>
        <Todos/>


    </div>
  )
}

export default App

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todo.Slice.js";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please enter both title and description.");
      return;
    }
    dispatch(addTodo({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <form onSubmit={addTodoHandler} className="max-w-sm mx-auto">
        {/* Title Input */}
        <div className="mb-5 mt-5 font-serif font-medium">
          <label
            htmlFor="todoTitle"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            New Todo Title
          </label>
          <input
            type="text"
            id="todoTitle"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm size-12 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add new todo title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-5 font-serif font-medium">
          <label
            htmlFor="todoDescription"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Add Todo Description
          </label>
          <textarea
            id="todoDescription"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32 resize  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add your todo description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white font-serif hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
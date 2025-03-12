import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        {
            id: 1,
            title: "Title of your todo",
            description: "Hello world",
        }
    ]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const {title, description} = action.payload
            const todo = {
                id: nanoid(),
                title: title,
                description: description
            }
            // push into todos list
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            const {id, title, description} = action.payload
            state.todos = state.todos.filter( (todo) => todo.id !== id)
        },
        updateTodo: (state, action) => {
            const {id, title, description} = action.payload
            const todo = state.todos.find( (todo) => todo.id === id)
            if (todo) {
                todo.title = title,
                todo.description = description
            }
        }
    }
})

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions
export default todoSlice.reducer
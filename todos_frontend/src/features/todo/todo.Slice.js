import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        {
            id: 1,
            title: "1st todo",
            description: "Hello world",
            // image: "/static/todo-image.png"
        }
    ]
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const { title, description } = action.payload;
            // console.log("payload has following iformation", action.payload);
            const todo = {
                id: nanoid(),
                title: title,
                description: description,
                // image: image
            };
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        }
    }
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
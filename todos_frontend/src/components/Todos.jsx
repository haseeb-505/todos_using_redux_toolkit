import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { removeTodo } from "../features/todo/todo.Slice.js";

function Todos() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      {/* Todo Count */}
      <div className="mb-6">
        <h1 className="text-white font-serif font-medium text-3xl m-2 text-center">
          Your ToDos
        </h1>
        <p className="text-white font-serif font-medium text-xl text-center m-2">
          Total Todos:{" "}
          {Array.isArray(todos) ? todos.length : "Error: Not an array"}
        </p>
      </div>

      {/* Todo Cards Grid */}
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            className="min-w-[300px] max-w-[400px] h-full shadow-md hover:shadow-lg transition-shadow"
          >
            <CardActionArea>
              <CardContent>
                <h2 className="text-xl font-bold">{todo.title}</h2>
                <p className="text-gray-600 mt-2">{todo.description}</p>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Todos;

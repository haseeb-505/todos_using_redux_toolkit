import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import AddTodo from "./AddTodo.jsx";
import Todos from "./Todos.jsx";
import Footer from "./Footer.jsx";

function Home() {
  return (
    <div className="bg-black">
        <Header/>
        <AddTodo/>
        <Todos/>
        <Footer/>
    </div>
  );
}

export default Home;

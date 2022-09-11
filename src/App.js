import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import store from './localStore';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]); // set array in default otherwise it will crash in initializing
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Run Once when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  };

  // Update filtered list when change on status or todos item
  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const getLocalTodos = () => {
    let todoLocal = store.get("todos");
    if(!todoLocal || !todoLocal.length) {
      todoLocal = []
    }
    setTodos(todoLocal);
  };

  // Set on local and state
  const onSetTodo = (todoItems) => {
    setTodos(todoItems);
    store.set("todos", todoItems);
  }

  return (
    <div className="App">
      <header>
        <h1>Ed's Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={onSetTodo}
        setInputText={setInputText}
        setStatus={setStatus}
      ></Form>
      <TodoList
        setTodos={onSetTodo}
        todos={todos}
        filteredTodos={filteredTodos}
      ></TodoList>
    </div>
  );
}

export default App;

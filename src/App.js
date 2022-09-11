import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]); // set array in default otherwise it will crash in initializing
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Run Once when the app start
  useEffect(() => {
    const getLocalTodos = () => {
      if (localStorage.getItem("todos") === null) {
        // console.log("Clear");
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
        let todoLocal = JSON.parse(localStorage.getItem("todos"));

        setTodos(todoLocal);
      }
    };
    // console.log("start");
    getLocalTodos();
  }, []);

  useEffect(() => {
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

    filterHandler();
    // console.log("hey");
  }, [todos, status]);

  // Set on local and state
  const onSetTodo = (todoItems) => {
    const saveLocalTodos = () => {
      console.log("Save");
      localStorage.setItem("todos", JSON.stringify(todoItems));
    };

    setTodos(todoItems);
    saveLocalTodos();
  };

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

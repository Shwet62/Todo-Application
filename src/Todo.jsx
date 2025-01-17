import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./Todo.css";

export default function Todo() {
  let [todos, setTodos] = useState([
    { task: "Sample Task", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");

  function updateTodoValue(event) {
    setNewTodo(event.target.value);
  }

  function addNewTask() {
    if (newTodo.trim() === "") return; // Prevent adding empty tasks
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { task: newTodo.trim(), id: uuidv4(), isDone: false },
      ];
    });
    setNewTodo("");
  }

  function deleteTodo(id) {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function markAsAllDone() {
    let newTodos = todos.map((todo) => ({ ...todo, isDone: true }));
    setTodos(newTodos);
  }

  function markAsDone(id) {
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: true };
      }
      return todo;
    });
    setTodos(newTodos);
  }

  return (
    <div className="container">
      <div className="sticky-input">
        <input
          type="text"
          placeholder="Add a task"
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button onClick={addNewTask}>Add Task</button>
      </div>
      <hr />
      <h4>Tasks Todo</h4>
      <div className="scrollable-tasks">
        <ol>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={todo.isDone ? { textDecoration: "line-through" } : {}}
              >
                {todo.task}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              {!todo.isDone && (
                <button onClick={() => markAsDone(todo.id)}>
                  Mark as Done
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>
      <button onClick={markAsAllDone}>Mark All as Done</button>
    </div>
  );
}

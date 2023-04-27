import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Create a project plan', completed: false },
    { id: 2, text: 'Design the application', completed: true },
    { id: 3, text: 'Develop the frontend', completed: false },
    { id: 4, text: 'Develop the backend', completed: false },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleToggle = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAll = () => {
    setTodos([]);
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <h3>Active</h3>
      <ul className="todos">
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <span>{todo.text}</span>
              <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
            </li>
          ))}
      </ul>
      <h3>Completed</h3>
      <ul className="todos">
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <span>{todo.text}</span>
              <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
            </li>
          ))}
      </ul>
      <div className="button-container">
        <button className="delete-completed" onClick={clearCompleted}>
          Clear Completed
        </button>
        <button className="delete-completed" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </div>
  );
};
export default TodoList;

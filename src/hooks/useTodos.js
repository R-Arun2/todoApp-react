import { useState, useEffect } from 'react';

export const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const addTodo = (addTodoObj) => {
    const newTodo = {
      id: addTodoObj.id,
      text: toTitleCase(addTodoObj.text), // Convert text to title case
      category: addTodoObj.category,
      dueDate: addTodoObj.dueDate,
      completed: addTodoObj.completed,
      creationDate: new Date().toISOString() // Ensure creationDate is set for sorting
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]); // Add to the beginning of the list
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filterTodos = (status) => {
    if (status === 'all') return todos;
    if (status === 'active') return todos.filter(todo => !todo.completed);
    if (status === 'completed') return todos.filter(todo => todo.completed);
  };

  return { addTodo, deleteTodo, toggleComplete, filterTodos };
};

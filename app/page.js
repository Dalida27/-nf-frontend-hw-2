'use client'
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

export default function Home() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (input.trim() === "") return;
    const newTask = {
      id: tasks.length + 1,
      text: input,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const getFilteredTasks = () => {
    if (filter === 'active') {
      return tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } else {
      return tasks;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 w-2/4 m-auto">
        <h1 className="text-4xl font-bold">TODO</h1>
        <input 
          value={input}
          onInput={(e) => setInput(e.target.value)}
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow ml-4"
          placeholder="What to do ?"
        />
        <div className="mb-4 flex items-center ml-4">
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white p-4 rounded ml-4"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded p-4">
        <TaskList tasks={getFilteredTasks()} onToggle={handleToggleTask} onDelete={handleDeleteTask} />

        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{tasks.filter(task => !task.completed).length} items left</span>
          <div>
            <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={handleClearCompleted}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}

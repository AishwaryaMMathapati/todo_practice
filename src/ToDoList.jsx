import { useState, useEffect } from "react";
import axios from "axios";
import "./ToDoList.css";

const API_URL = "http://127.0.0.1:8000/api/tasks/";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", completed: false });

  //Fetches tasks from the backend
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  //Function to handle input change
  function handleChange(event) {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  }

  //for adding tasks
  function addTask() {
    if (newTask.title.trim() !== "" && newTask.description.trim() !== "") {
      axios.post(API_URL, newTask)
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error("Error adding task:", error));
      setNewTask({ title: "", description: "", completed: false });
    }
  }
  
  //for delleting tasks
  function deleteTask(id) {
    axios.delete(`${API_URL}${id}/`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error("Error deleting task:", error));
  }
  
  //Marking a task as completed
  function toggleComplete(task) {
    const updatedTask = { ...task, completed: !task.completed };
    axios.put(`${API_URL}${task.id}/`, updatedTask)
      .then(() => {
        setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
      })
      .catch(error => console.error("Error updating task:", error));
  }

  return (
    <div className="todo-wrapper">
      <div className="todo-container">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input type="text" name="title" placeholder="Task title" value={newTask.title} onChange={handleChange} />
          <input type="text" name="description" placeholder="Task description" value={newTask.description} onChange={handleChange} />
          <button className="btn btn-add" onClick={addTask}>Add Task</button>
        </div>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? "completed-task" : ""}`}>
              <div className="task-details">
                <strong className="task-title">{task.title}</strong>
                <p className="task-desc">{task.description}</p>
              </div>
              <div className="task-actions">
                <button className="complete-btn" onClick={() => toggleComplete(task)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: Date.now(),
    title: "",
    description: "",
    status: "To Do",
    priority: "Low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(formData));
    setFormData({
      id: Date.now(),
      title: "",
      description: "",
      status: "To Do",
      priority: "Low",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task Title"
        // required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Task Description"
        // required
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;

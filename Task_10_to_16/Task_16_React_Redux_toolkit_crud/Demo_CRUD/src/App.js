import React from "react";
import TaskBoard from "./components/TaskBoard";
import TaskForm from "./components/TaskForm";

const App = () => {
  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskBoard />
    </div>
  );
};

export default App;

import React from "react";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

const TaskBoard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const statuses = ["To Do", "In Progress", "Completed"];

  return (
    <div className="task-board">
      {statuses.map((status) => (
        <div key={status} className="task-column">
          {console.log("status:",status)}
          <h3>{status}</h3>
          {tasks
            .filter((task) => task.status == status)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;

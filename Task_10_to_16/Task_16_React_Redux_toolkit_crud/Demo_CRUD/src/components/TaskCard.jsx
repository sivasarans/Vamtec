import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask,editTask } from "../redux/tasksSlice";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <div>
        <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;

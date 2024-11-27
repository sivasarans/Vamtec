import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: 1, title: "Design UI", description: "Create wireframes", status: "To Do", priority: "High" },
    { id: 2, title: "Develop API", description: "Build REST endpoints", status: "In Progress", priority: "Medium" },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (initialstate_ref, action) => {
      initialstate_ref.tasks = [...initialstate_ref.tasks, action.payload];      console.log("state:",initialstate_ref.tasks);
      console.log("action payload:",action.payload);

    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index >= 0) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
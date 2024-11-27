import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country_tasks: [
    { id: 1, countryCode: "IN", countryName: "India" },
    { id: 2, countryCode: "UK", countryName: "United Kingdom" },
  ],
  state_tasks: [
    { id: 1, stateName: "Tamil Nadu", country: "India" },
    { id: 2, stateName: "California", country: "United States" },
  ],
  register_tasks: [
    {
      id: 1,
      name: "siva",
      organization: "xyz",
      email: "x@gmail.com",
      password: "123456",
      numUsers: "1",
      mobile: "9999988888",
      country: "India",
      state: "TN",
      expireDays: "1",
      photo: null,
    },
    {
      id: 2,
      name: "saran",
      organization: "abc",
      email: "y@gmail.com",
      password: "654321",
      numUsers: "1",
      mobile: "9898989898",
      country: "India",
      state: "TN",
      expireDays: "1",
      photo: null,
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks", // One generic slice for all task lists
  initialState,
  reducers: { // CRUD Operations actioners
    addTask: (x, action) => {
      const newId = x.tasks.length > 0 ? Math.max(...x.tasks.map((task) => task.id)) + 1 : 1;
      x.tasks.push({ id: newId, ...action.payload })},
    editTask: (x, action) => {
      const index = x.tasks.findIndex((task) => task.id === action.payload.id);
      if (index >= 0) { x.tasks[index] = { ...x.tasks[index], ...action.payload }}},
    deleteTask: (x, action) => { x.tasks = x.tasks.filter((task) => task.id !== action.payload)},
    loadTasks: (x, action) => { x.tasks = action.payload },},});

export const { addTask, editTask, deleteTask, loadTasks } = tasksSlice.actions;
export default tasksSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tasks: [
    { id: 1, countryCode: "IN", countryName: "India" },
    { id: 2, countryCode: "UK", countryName: "United Kingdom" }, ]};

const countrySlice = createSlice({
  name: "country",
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

export const { addTask, editTask, deleteTask, loadTasks } = countrySlice.actions;
export default countrySlice.reducer;
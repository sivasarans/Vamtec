import axiosInstance from "./axiosInstance";

export const fetchCountries = async () => {
  const { data } = await axiosInstance.get("/countries");  return data;};
export const fetchStates = async () => {
  const { data } = await axiosInstance.get("/states"); return data;};

export const addState = async (stateData) => {
  const { data } = await axiosInstance.post("/states", stateData);  return data;};
export const updateState = async (id, stateData) => {
  const { data } = await axiosInstance.put(`/states/${id}`, stateData);  return data;};

export const deleteState = async (id) => {  await axiosInstance.delete(`/states/${id}`);};

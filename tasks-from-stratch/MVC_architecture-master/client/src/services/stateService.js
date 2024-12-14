import axiosInstance from "./axiosInstance";

// Fetch countries
export const fetchCountries = async () => {
  const { data } = await axiosInstance.get("/countries");
  return data;
};

// Fetch states
export const fetchStates = async () => {
  const { data } = await axiosInstance.get("/states");
  return data;
};

// Add state
export const addState = async (stateData) => {
  const { data } = await axiosInstance.post("/states", stateData);
  return data;
};

// Update state
export const updateState = async (id, stateData) => {
  const { data } = await axiosInstance.put(`/states/${id}`, stateData);
  return data;
};

// Delete state
export const deleteState = async (id) => {
  await axiosInstance.delete(`/states/${id}`);
};

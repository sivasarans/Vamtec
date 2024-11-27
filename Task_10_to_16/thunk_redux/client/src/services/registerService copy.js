import axiosInstance from "./axiosInstance";

const registerService = {
  getCountries: async () => await axiosInstance.get("/countries").then((res) => res.data),
  getStatesByCountry: async (countryName) =>
    await axiosInstance.get(`/countries/fetchStateByCountry/${countryName}`).then((res) => res.data),
  fetchUsers: async () => await axiosInstance.get("/register").then((res) => res.data),
  createUser: async (userData) =>
    await axiosInstance.post("/register", userData).then((res) => res.data),
  updateUser: async (id, userData) =>
    await axiosInstance.put(`/register/${id}`, userData).then((res) => res.data),
  deleteUser: async (id) => await axiosInstance.delete(`/register/${id}`).then(() => ({ id })),
};

export default registerService;

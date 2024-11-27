import axiosInstance from "./axiosInstance";

const countryService = {
  fetch: async () => await axiosInstance.get("/countries").then((res) => res.data),
  add: async (data) => await axiosInstance.post("/countries", data).then((res) => res.data),
  update: async (id, data) => await axiosInstance.put(`/countries/${id}`, data).then((res) => res.data),
  delete: async (id) => await axiosInstance.delete(`/countries/${id}`).then((res) => ({ id })),
};

export default countryService;

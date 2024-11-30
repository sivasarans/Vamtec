import axiosInstance from "./axiosInstance";

const registerService = {
  fetchRecords: async () => {
    try {
      const { data } = await axiosInstance.get(`/countries/register`); return data; } 
    catch (error) {throw new Error(error.message);
}
  },

  addOrUpdateRecord: async (formData, editId, file) => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (file){ data.append('file', file);}

      const method = editId ? 'put' : 'post';
      const url = editId ? `/register/${editId}` : `/register/`;
      await axiosInstance[method](url, data);

      return editId ? 'Updated successfully!' : 'Added successfully!';
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteRecord: async (id) => {
    try {
      await axiosInstance.delete(`/register/${id}`);
      return 'Deleted successfully!';
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default registerService;

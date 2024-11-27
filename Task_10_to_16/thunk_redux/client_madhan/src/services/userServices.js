import axiosInstance from './axiosConfig';

const userService = {
    getUsers: async () => {
        const response = await axiosInstance.get('/users');
        return response.data;
    },
    addUser: async (user) => {
        console.log(user);
        const response = await axiosInstance.post('/users', user);
        console.log(user);
        return response.data;
    },
    deleteUser: async (id) => {
        await axiosInstance.delete(`/users/${id}`);
    },
    updateUser: async (id,user) => {
        console.log(id,user);
       const response = await axiosInstance.put(`/users/${id}`,user);
        return response.data;
    },
};

export default userService;
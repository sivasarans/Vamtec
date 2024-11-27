import axiosInstance from './axiosConfig';

const stateService = {
    getStates: async () => {
        const response = await axiosInstance.get('/states');
        return response.data;
    },
    addState: async (state) => {
        console.log(state);
        const response = await axiosInstance.post('/states', state);
        console.log(state);
        return response.data;
    },
    deleteState: async (id) => {
        await axiosInstance.delete(`/states/${id}`);
    },
    updateState: async (id,state) => {
        console.log(id,state);
       const response = await axiosInstance.put(`/states/${id}`,state);
        return response.data;
    },
};

export default stateService;
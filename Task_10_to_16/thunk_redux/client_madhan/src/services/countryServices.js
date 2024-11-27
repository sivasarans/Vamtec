import axiosInstance from './axiosConfig';

const countryService = {
    getCountries: async () => {
        const response = await axiosInstance.get('/countries');
        return response.data;
    },
    addCountry: async (country) => {
        const response = await axiosInstance.post('/countries', country);
        return response.data;
    },
    deleteCountry: async (id) => {
        await axiosInstance.delete(`/countries/${id}`);
    },
    updateCountry: async (id,country) => {
        console.log(id,country);
       const response = await axiosInstance.put(`/countries/${id}`,country);
        return response.data;
    },
};

export default countryService;
const countryModels = require('../models/country_models');

const countryControllers = {
    getAllCountries: async (req, res) => {
        try {
            const countries = await countryModels.getAllCountries();
            res.json(countries);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching countries' });
        }
    },

    create: async (req, res) => {
        try {
            const { countryCode, countryName } = req.body;
            const newCountry = await countryModels.create(countryCode, countryName);
            res.status(201).json(newCountry);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating country' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { countryCode, countryName } = req.body;
            const updatedCountry = await countryModels.update(id, countryCode, countryName);
            updatedCountry
                ? res.json(updatedCountry)
                : res.status(404).json({ message: 'Country not found' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating country' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await countryModels.delete(id);
            deleted
                ? res.json({ message: 'Country deleted successfully' })
                : res.status(404).json({ message: 'Country not found' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting country' });
        }
    }
};

module.exports = countryControllers;

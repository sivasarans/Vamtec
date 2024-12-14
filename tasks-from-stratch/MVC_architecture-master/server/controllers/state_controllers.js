const stateModels = require('../models/state_models');

const stateControllers = {
    getAllStates: async (req, res) => {
        try {
            const states = await stateModels.getAllStates();
            res.json(states);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching states' });
        }
    },

    createState: async (req, res) => {
        const { country_name, state_name } = req.body;

        try {
            const newState = await stateModels.createState(country_name, state_name);
            res.status(201).json(newState);
        } catch (err) {
            console.error(err.message);
            res.status(400).json({ error: err.message });
        }
    },

    updateState: async (req, res) => {
        const { id } = req.params;
        const { country_name, state_name } = req.body;

        try {
            const updatedState = await stateModels.updateState(id, country_name, state_name);
            res.json(updatedState);
        } catch (err) {
            console.error(err.message);
            res.status(err.message === 'Country does not exist' ? 400 : 404).json({ error: err.message });
        }
    },

    deleteState: async (req, res) => {
        const { id } = req.params;

        try {
            await stateModels.deleteState(id);
            res.json({ message: 'State deleted successfully' });
        } catch (err) {
            console.error(err.message);
            res.status(404).json({ error: err.message });
        }
    }
};

module.exports = stateControllers;

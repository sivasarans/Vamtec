const registerModels = require('../models/register_models');

const registerControllers = {
    getAllUsers: async (req, res) => {
        try {
            const users = await registerModels.getAllUsers();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    },

    createUser: async (req, res) => {
        const userData = req.body;
        const filePath = req.file ? req.file.filename : null;

        try {
            const newUser = await registerModels.createUser(userData, filePath);
            res.status(201).json({ message: `Hello, ${userData.name}!`, user: newUser, fileUrl: filePath });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to add user' });
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const userData = req.body;
        const filePath = req.file ? req.file.filename : null;

        try {
            const updatedUser = await registerModels.updateUser(id, userData, filePath);
            res.status(200).json({ message: `Hello, ${userData.name}!`, user: updatedUser, fileUrl: filePath });
        } catch (err) {
            console.error(err.message);
            res.status(err.message === 'User not found' ? 404 : 500).json({ error: err.message });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            await registerModels.deleteUser(id);
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error(err.message);
            res.status(err.message === 'User not found' ? 404 : 500).json({ error: err.message });
        }
    },
};

module.exports = registerControllers;

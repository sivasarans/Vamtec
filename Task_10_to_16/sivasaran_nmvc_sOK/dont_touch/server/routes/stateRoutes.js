const express = require('express');
const router = express.Router();
const stateControllers = require('../controllers/state_controllers');

// Define routes
router.get('/', stateControllers.getAllStates);
router.post('/', stateControllers.createState);
router.put('/:id', stateControllers.updateState);
router.delete('/:id', stateControllers.deleteState);
module.exports = router;

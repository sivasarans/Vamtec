const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const registerControllers = require('../controllers/register_controllers');

const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
});

router.get('/', registerControllers.getAllUsers);
router.post('/', upload.single('file'), registerControllers.createUser);
router.put('/:id', upload.single('file'), registerControllers.updateUser);
router.delete('/:id', registerControllers.deleteUser);
module.exports = router;
